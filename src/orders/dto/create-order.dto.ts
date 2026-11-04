import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsInt, Min, ValidateNested } from "class-validator";

class OrderItemInput{
    @IsInt()
    @Min(1)
    productId: number

    @IsInt()
    @Min(1)
    quantity: number

}

export class CreateOrderDto {
    
    @ApiProperty({description: 'Itens do pedido.', example: ['Luvas', 'Botas'], minLength: 1})
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each: true})
    @Type( () => OrderItemInput)
    items: OrderItemInput[]

    @ApiProperty({description: 'Id do endereço.', example: 19})
    @IsInt()
    addressId: number;
}