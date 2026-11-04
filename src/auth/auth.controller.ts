import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto.username, dto.email, dto.password)
    }

    @Post('login')
    @ApiOperation({})
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto.username, dto.password)
    }
}
