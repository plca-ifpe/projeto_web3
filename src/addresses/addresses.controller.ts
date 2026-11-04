import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Req, Post } from '@nestjs/common';
import { AddressesService } from './addresses.service.js';
import { CreateAddressDto } from './dto/create-address.dto.js';
import { UpdateAddressDto } from './dto/update-address.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: 'Cria um endereço'})
  @ApiResponse({status: 200, description: 'Endereço criado'})
  @ApiResponse({status: 404, description: 'Usuário não encontrado'})
  create(@Body() createAddressDto: CreateAddressDto, @Req() req: Request & {user : { id:number}}) {
    return this.addressesService.create(createAddressDto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: 'Obtém todos os enderecos cadastrados pelo usuário'})
  @ApiResponse({status: 200, description: 'Endereços encontrados'})
  findAll(@Req() req: Request & { user: {id:number}}) {
    return this.addressesService.findAll(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: 'Obtém o enderecos cadastrado pelo usuário por ID'})
  @ApiResponse({status: 200, description: 'Endereços encontrados'})
  findById(@Param('id') id: string, @Req() req: Request & { user: {id:number}}) {
    return this.addressesService.findById(+id, req.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: 'Atualize o endereco cadastrado pelo usuário por ID'})
  @ApiResponse({status: 200, description: 'Endereços encontrados'})
  patch(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto, @Req() req: Request & { user: {id:number}}) {
    return this.addressesService.update(+id, updateAddressDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deleta um endereço (Apenas ADMINS)'})
  @ApiResponse({status: 204, description: "Sucesso na remoção do produto"})
  @ApiResponse({status: 401, description: "Não autenticado"})
  @ApiResponse({status: 403, description: "Você não tem permissão para acessar esse serviço"})
  @ApiResponse({status: 404, description: "Produto não encontrado"})
  delete(@Param('id') id: string) {
    return this.addressesService.remove(+id);
  }
}
