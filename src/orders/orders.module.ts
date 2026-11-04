import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller.js';
import { OrdersService } from './orders.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, OrderItem } from './order.entity.js';
import { User } from '../auth/user.entity.js';
import { OrderOwnershipGuard } from './order-ownership.guard.js';
import { AddressesModule } from '../addresses/addresses.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, User]), AddressesModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrderOwnershipGuard],
  exports: [OrdersService, OrderOwnershipGuard]
})
export class OrdersModule {}
