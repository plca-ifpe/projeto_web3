import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller.js';
import ProductService from './product.service.js';

@Module({
  controllers: [ProductsController],
  providers: [ProductService]
})
export class ProductsModule {}
