import { ApiProperty } from "@nestjs/swagger"
import { IsString, MinLength } from "class-validator"

export class LoginDto {
    @ApiProperty({description: 'Nome de usuário', example: 'Paulo', minLength: 2})
    @IsString()
    @MinLength(2)
    username: string
    
    @ApiProperty({description: 'Senha do usuário', example: '123789', minLength: 6})
    @IsString()
    @MinLength(6)
    password: string
}