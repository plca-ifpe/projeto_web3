import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller.js';
import ProductService from './product.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductService]
})
export class ProductsModule {}
