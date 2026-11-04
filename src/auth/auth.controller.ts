import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('register')
    @ApiOperation({summary: 'Registra um usuário'})
    @ApiResponse({status: 201, description: 'Sucesso no registro'})
    @ApiResponse({status: 409, description: 'Username ou email já cadastrado.'})
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto.username, dto.email, dto.password)
    }

    @Post('login')
    @ApiOperation({summary: 'Faz login de um usuário'})
    @ApiResponse({status: 201, description: 'Sucesso no login'})
    @ApiResponse({status: 401, description: 'Credenciais inválidas ou usuário inexistente.'})
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto.username, dto.password)
    }
}
