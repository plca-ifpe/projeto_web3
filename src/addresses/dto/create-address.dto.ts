import { IsInt, IsString, MinLength } from "class-validator"
import { PrimaryGeneratedColumn } from "typeorm"

export class CreateAddressDto {
    @IsString()
    @MinLength(10)
    address: string;
}
