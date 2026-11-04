import { Param, Body, Controller, Get, Post, NotFoundException, Put, Delete, HttpCode, Patch, Query, UseGuards, ParseIntPipe, UploadedFile, BadRequestException, UseInterceptors, Res } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { ProductDto } from './dto/product.dto.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import ProductService from './product.service.js';
import { PatchProductDto } from './dto/patch-product.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { createReadStream, existsSync } from 'fs';
import type { Response } from 'express';

@Controller('products')
export class ProductsController {

    constructor( private readonly productService: ProductService) {}

    @Get()
    @ApiOperation({ summary: 'Busca todos os produtos'})
    @ApiResponse({status: 200, description: "Sucesso na busca dos produtos"})
    findAll(@Query('q') query?: string): Promise<ProductDto[]> {
        if (query)
            return this.productService.queryByName(query)
        return this.productService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Busca dados de um produto'})
    @ApiResponse({status: 200, description: "Sucesso na busca do produto"})
    @ApiResponse({status: 404, description: "Produto não encontrado"})
    findById(@Param('id') id: number): Promise<ProductDto> {
        return this.productService.findById(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN', 'MANAGER')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Atualiza dados de um produto (Apenas ADMINS)'})
    @ApiResponse({status: 200, description: "Sucesso na atualização do produto"})
    @ApiResponse({status: 401, description: "Não autenticado"})
    @ApiResponse({status: 403, description: "Não autorizado"})
    @ApiResponse({status: 404, description: "Produto não encontrado"})
    update(@Param('id') id:number, @Body() updatedProduct: UpdateProductDto): Promise<ProductDto> {
        return this.productService.update(id, updatedProduct);
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Deleta um produto (Apenas ADMINS)'})
    @ApiResponse({status: 204, description: "Sucesso na remoção do produto"})
    @ApiResponse({status: 401, description: "Não autenticado"})
    @ApiResponse({status: 403, description: "Você não tem permissão para acessar esse serviço"})
    @ApiResponse({status: 404, description: "Produto não encontrado"})
    delete(@Param('id') id:number) : Promise<void> {
        return this.productService.delete(id)
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Cria um novo produto (Apenas ADMINS)'})
    @ApiResponse({status: 201, description: "Sucesso na criação do produto"})
    @ApiResponse({status: 401, description: "Não autenticado"})
    @ApiResponse({status: 403, description: "Não autorizado"})
    create(@Body() createProduct: CreateProductDto): Promise<ProductDto> {
        return this.productService.create(createProduct)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Atualiza dados de um produto, porém aceita JSON parcial (Apenas ADMINS)'})
    @ApiResponse({status: 200, description: "Sucesso na atualização do produto"})
    @ApiResponse({status: 401, description: "Não autenticado"})
    @ApiResponse({status: 403, description: "Não autorizado"})
    @ApiResponse({status: 404, description: "Produto não encontrado"})
    patch(
    @Param('id') id: string,
    @Body() dto: PatchProductDto,
    ) {
    return this.productService.patch(Number(id), dto);
    }

    @Post(':id/image')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Atualiza dados de um produto com uma imagem (Apenas ADMINS)'})
    @ApiResponse({status: 200, description: "Sucesso na atualização do produto"})
    @ApiResponse({status: 401, description: "Não autenticado"})
    @ApiResponse({status: 403, description: "Não autorizado"})
    @ApiResponse({status: 404, description: "Produto não encontrado"})
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (_req, file, callback) => {
                    const safe = file.originalname.replace(/\s+/g, '_');
                    callback(null, `${Date.now()}-${safe}`);
                },
            }),
            limits: {fileSize: 2 * 1024 * 1024},
            fileFilter: (_req, file, callback) => {
                const ok = ['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)
                if (!ok) return callback(null, false);
                callback(null, true) 
            } 
        })
    )
    async uploadImage(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File
    ) {
        if (!file) throw new BadRequestException('Envie um arquivo jpg/png/jpeg.')
        await this.productService.updateImageFilename(id, file.filename)
        return { productId: id, imageUrl: `/products/${id}image`}
    }

    @Get(':id/image')
    @ApiOperation({ summary: 'Busca a imagem de um produto (Apenas ADMINS)'})
    @ApiResponse({status: 200, description: "Sucesso na busca da imagem"})
    @ApiResponse({status: 404, description: "Produto não encontrado"})
    async getImage(
        @Param('id', ParseIntPipe) id:number,
        @Res() res: Response
    ) {
        const product = await this.productService.findById(id);
        if (!product) throw new NotFoundException(`Imagem não encontrada.`);
        const path = join(process.cwd(), 'uploads', product.imageFilename)
        if (!existsSync(path)) throw new NotFoundException('Imagem não encontrada.')
            createReadStream(path).pipe(res)
    }
}
