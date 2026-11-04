import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, Min, MinLength } from "class-validator"

export class RegisterDto {
    
    @ApiProperty({description: 'Nome de usuário', example: 'Paulo', minLength: 2})
    @IsString()
    @MinLength(2)
    username: string

    @ApiProperty({description: 'Email do usuário', example: 'plca@discente.ifpe.edu.br'})
    @IsEmail()
    email: string

    @ApiProperty({description: 'Senha do usuário', example: '123789', minLength: 6})
    @IsString()
    @MinLength(6)
    password: string
}