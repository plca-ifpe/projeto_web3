import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAddressDto } from './dto/update-address.dto.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity.js';
import { CreateAddressDto } from './dto/create-address.dto.js';

@Injectable()
export class AddressesService {

  constructor (
          @InjectRepository(Address)
          private readonly addressRepository: Repository<Address>,
      ){}
  
  async create(createAddress: CreateAddressDto): Promise<Address>{
      const product = this.addressRepository.create(createAddress)
      return this.addressRepository.save(product)
  }

  findAll(): Promise<Address[]> {
    return this.addressRepository.find();
  }

  async findById(id: number): Promise<Address> {
        let address = await this.addressRepository.findOne({ where: { id } })
        if(!address)
            throw new NotFoundException(`Endereço com ID ${id} não encontrado.`);
        return address;
    }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
