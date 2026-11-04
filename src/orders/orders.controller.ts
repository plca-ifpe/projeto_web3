import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {

    constructor(
        private readonly orderService: OrdersService
    ) {}

    
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Cria um novo pedido'})
    @ApiResponse({status: 201, description: "Sucesso na criação do pedido"})
    @ApiResponse({status: 400, description: "Estoque insuficiente para o produto xpto. Quantidade em estoque = valor_de_exemplo."})
    @ApiResponse({status: 401, description: "Não autenticado"})
    @ApiResponse({status: 404, description: "Endereço de id xpto não encontrado ou inexistente."})
    @ApiResponse({status: 404, description: "Produto xpto não encontrado."})
    create(@Body() dto:CreateOrderDto, @Req() req: Request & {user : { id:number}}){
        return this.orderService.create(dto, req.user.id)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Busca todos os pedidos de um usuário'})
    @ApiResponse({status: 200, description: "Sucesso na busca dos pedidos"})
    findAll(@Req() req: Request & {user : { id:number, role: string}}){
        return this.orderService.findAll(req.user.id, req.user.role)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Busca dados de um pedido de um usuário'})
    @ApiResponse({status: 200, description: "Sucesso na busca do pedido"})
    @ApiResponse({status: 404, description: "Pedido não encontrado"})
    findOne( @Param('id', ParseIntPipe) id: number, @Req() req: Request & {user : { id:number}}){
        return this.orderService.findOne(id, req.user.id)
    }

    @Post(':id/cancel')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Cancela um pedido de um usuário'})
    @ApiResponse({status: 201, description: "Sucesso no cancelamento do pedido"})
    @ApiResponse({status: 400, description: "Apenas ordens em estado OPEN podem ser canceladas."})
    @ApiResponse({status: 404, description: "Pedido não encontrado"})
    cancel( @Param('id', ParseIntPipe) id: number, @Req() req: Request & {user : { id:number}}){
        return this.orderService.cancel(id, req.user.id)
    }

    @Post(':id/paid')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Paga um pedido de um usuário'})
    @ApiResponse({status: 201, description: "Sucesso no pagamento do pedido"})
    @ApiResponse({status: 400, description: "Apenas ordens em estado OPEN podem ser pagas."})
    @ApiResponse({status: 404, description: "Pedido não encontrado"})
    pay( @Param('id', ParseIntPipe) id: number, @Req() req: Request & {user : { id:number}}){
        return this.orderService.pay(id, req.user.id)
    }
}
