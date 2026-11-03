import { Param, Body, Controller, Get, Post, NotFoundException, Put, Delete, HttpCode, Patch, Query, UseGuards } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { ProductDto } from './dto/product.dto.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import ProductService from './product.service.js';
import { PatchProductDto } from './dto/patch-product.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { RolesGuard } from '../auth/roles.guard.js';

@Controller('products')
export class ProductsController {

    constructor( private readonly productService: ProductService) {}

    @Get()
    findAll(@Query('q') query?: string): Promise<ProductDto[]> {
        if (query)
            return this.productService.queryByName(query)
        return this.productService.findAll()
    }

    @Get(':id')
    findById(@Param('id') id: number): Promise<ProductDto> {
        return this.productService.findById(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    update(@Param('id') id:number, @Body() updatedProduct: UpdateProductDto): Promise<ProductDto> {
        return this.productService.update(id, updatedProduct);
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    delete(@Param('id') id:number) : Promise<void> {
        return this.productService.delete(id)
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    create(@Body() createProduct: CreateProductDto): Promise<ProductDto> {
        return this.productService.create(createProduct)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    patch(
    @Param('id') id: string,
    @Body() dto: PatchProductDto,
    ) {
    return this.productService.patch(Number(id), dto);
    }
}
