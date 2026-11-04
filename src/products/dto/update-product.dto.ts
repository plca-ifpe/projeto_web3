import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsString, Min, MinLength } from "class-validator";

export class UpdateProductDto {
    @ApiProperty({description: 'Nome do produto.', example: 'Livro de Desenvolvimento Web.', minLength: 3})
    @IsString()
    @MinLength(3)
    name : string;

    @ApiProperty({description: 'Preço do produto', example: 20.99, minimum: 0.01})
    @IsNumber({maxDecimalPlaces: 2})
    @Min(0.01)
    price: number;
    
    @ApiProperty({description: 'Número em estoque', example: 40, minimum: 0})
    @IsInt()
    @Min(0)
    stock: number;
}