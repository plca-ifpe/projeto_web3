import { IsInt, IsString, MinLength } from "class-validator"
import { PrimaryGeneratedColumn } from "typeorm"

export class UpdateAddressDto {
    @PrimaryGeneratedColumn()
    addressId: number;

    @IsString()
    @MinLength(10)
    address: string;

    @IsInt()
    orderId: number;
}
