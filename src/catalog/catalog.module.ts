import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service.js';
import { CatalogController } from './catalog.controller.js';
import { ProductsModule } from '../products/products.module.js';

@Module({
  providers: [CatalogService],
  controllers: [CatalogController],
  imports: [ProductsModule]
})
export class CatalogModule {}
