import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, MinLength } from "class-validator"
import { PrimaryGeneratedColumn } from "typeorm"

export class AddressDto {
    @ApiProperty({description: 'Id do endereço.', example: 4})
    @PrimaryGeneratedColumn()
    addressId: number;

    @ApiProperty({description: 'Endereço', example: 'Rua dos bobos, número 0.', minLength: 10})
    @IsString()
    @MinLength(10)
    address: string;
}
