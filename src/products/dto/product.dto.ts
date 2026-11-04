import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsString, Min, MinLength } from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";

export class ProductDto {
    @ApiProperty({description: 'Id do produto.', example: 4, minimum: 1})
    @PrimaryGeneratedColumn()
    @IsInt()
    id: number;
    
    @ApiProperty({description: 'Nome do produto', example: 'Luvas', minLength: 3})
    @IsString()
    @MinLength(3)
    name : string;

    @ApiProperty({description: 'Preço do produto', example: 19.99, minimum: 0.01})
    @IsNumber({maxDecimalPlaces: 2})
    @Min(0.01)
    price: number;

    @ApiProperty({description: 'Número em estoque', example: 30, minimum: 0})
    @IsInt()
    @Min(0)
    stock: number;
}