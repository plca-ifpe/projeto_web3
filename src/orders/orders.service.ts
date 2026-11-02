import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order, OrderItem } from './order.entity.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { Product } from '../products/product.entity.js';
import { UndefinedModuleEntryException } from '@nestjs/core/errors/exceptions/undefined-module-entry.exception.js';

@Injectable()
export class OrdersService {

    constructor (
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private readonly dataSource: DataSource
    ){}

    async create(dto: CreateOrderDto, userId: number): Promise<Order>{



        return this.dataSource.transaction(async (manager) => {
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
}
