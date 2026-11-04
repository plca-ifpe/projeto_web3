import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order, OrderItem } from './order.entity.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { Product } from '../products/product.entity.js';
import { Address } from '../addresses/entities/address.entity.js';
import { AddressesService } from '../addresses/addresses.service.js';

@Injectable()
export class OrdersService {

    constructor (
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private readonly AddressesService: AddressesService,
        private readonly dataSource: DataSource
    ){}

    async create(dto: CreateOrderDto, userId: number): Promise<Order>{
        return this.dataSource.transaction(async (manager) => {
            const address = await this.AddressesService.findById(dto.addressId)

            if (!address) throw new NotFoundException(`Endereço de id ${dto.addressId} não encontrado ou inexistente.`)
            
            const order = manager.create(Order, {userId, status: 'OPEN', items: []})

            for (const itemDto of dto.items) {
                const product = await manager.findOne(Product, {where: {id: itemDto.productId}})
                if (!product) throw new NotFoundException(`Produto ${itemDto.productId} não encontrado.`);
                if (itemDto.quantity > product.stock)
                    throw new BadRequestException(`Estoque insuficiente para o produto ${itemDto.productId}. Quantidade em estoque = ${product.stock}`)

                await manager.decrement(Product, {id: product.id}, 'stock', itemDto.quantity)

                const item = manager.create(OrderItem, {
                    productId: product.id,
                    quantity: itemDto.quantity,
                    unitPrice: product.price
                })
                order.items.push(item)
            }

            return manager.save(order);
        });
    }

    async findAll() {
        return this.orderRepository.find({order: {id: 'DESC'}});
    }

    async findOne(id:number){
        const order = await this.orderRepository.findOne({where: {id: id}})
        if (!order) throw new NotFoundException(`Ordem de número ${id} não encontrada.`)
        return order
    }

    async cancel(id:number){
        return this.dataSource.manager.transaction(async (manager) => {
            const order = await manager.findOne(Order, {where: {id: id}})
            if (!order) throw new NotFoundException(`Ordem de número ${id} não encontrada.`)
            if (order.status != 'OPEN') throw new BadRequestException(`Apenas ordens em estado OPEN podem ser canceladas.`)
            for (const item of order.items){
                await manager.increment(Product, {id:item.productId}, 'stock', item.quantity)
            }
            order.status = 'CANCELLED'
            return manager.save(order)
        })
    }

    async pay(id:number) {
        return this.dataSource.manager.transaction(async (manager) => {
            const order = await manager.findOne(Order, {where: {id: id}})
            if (!order) throw new NotFoundException(`Ordem de número ${id} não encontrada.`)
            if (order.status != 'OPEN') throw new BadRequestException(`Apenas ordens em estado OPEN podem ser pagas.`)
            order.status = 'PAID'
            return manager.save(order)
        })
    }
}
