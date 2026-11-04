import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller.js';
import ProductService from './product.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity.js';
import { AuthModule } from '../auth/auth.module.js';
import { OrdersModule } from '../orders/orders.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), AuthModule, OrdersModule],
  controllers: [ProductsController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductsModule {}
