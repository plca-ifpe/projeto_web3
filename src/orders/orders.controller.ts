import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('orders')
export class OrdersController {

    constructor(
        private readonly orderService: OrdersService
    ) {}

    
    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() dto:CreateOrderDto){
        return this.orderService.create(dto, 1)
    }

    @Get()
    findAll(){
        return this.orderService.findAll()
    }

    @Get(':id')
    findOne( @Param('id', ParseIntPipe) id: number){
        return this.orderService.findOne(id)
    }

    @Post(':id/cancel')
    cancel( @Param('id', ParseIntPipe) id: number){
        return this.orderService.cancel(id)
    }

    @Post('id/paid')
    pay( @Param('id', ParseIntPipe) id: number){
        return this.orderService.pay(id)
    }
}
