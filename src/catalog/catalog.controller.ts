import { Controller, Get, UseGuards } from '@nestjs/common';
import { CatalogService } from './catalog.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('catalog')
export class CatalogController {
    constructor(
        private readonly catalogService: CatalogService
    ){}
    
    @Get('summary')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Obtém sumário do estoque'})
    @ApiResponse({status: 200, example: {
    "totalProducts": 2,
    "totalStockUnits": 27
    }})
    getSummary() {
        return this.catalogService.getSummary()
    }
}
