import { IsString, MinLength } from "class-validator"

export class CreateAddressDto {
    @IsString()
    @MinLength(10)
    address: string;
}
