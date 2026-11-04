import { PartialType } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto.js';

export class PatchAddressDto extends PartialType(CreateAddressDto) {}
