import { Param, Body, Controller, Get, Post, NotFoundException, Put, Delete, HttpCode } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { ProductDto } from './dto/product.dto.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import ProductService from './product.service.js';

@Controller('products')
export class ProductsController {

    constructor( private readonly productService: ProductService) {}

    @Get()
    findAll(): Promise<ProductDto[]> {
        return this.productService.findAll()
    }

    @Get(':id')
    findById(@Param('id') id: number): Promise<ProductDto> {
        return this.productService.findById(id);
    }

    @Put(':id')
    update(@Param('id') id:number, @Body() updatedProduct: UpdateProductDto): Promise<ProductDto> {
        return this.productService.update(id, updatedProduct);
    }

    @Delete(':id')
    @HttpCode(204)
    delete(@Param('id') id:number) : Promise<void> {
        return this.productService.delete(id)
    }

    @Post()
    create(@Body() createProduct: CreateProductDto): Promise<ProductDto> {
        return this.productService.create(createProduct)
    }

}
