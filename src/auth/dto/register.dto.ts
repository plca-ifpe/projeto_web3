import { IsEmail, IsString, Min, MinLength } from "class-validator"

export class RegisterDto {
    
    @IsString()
    @MinLength(2)
    username: string

    @IsEmail()
    email: string

    @IsString()
    @MinLength(6)
    password: string
}