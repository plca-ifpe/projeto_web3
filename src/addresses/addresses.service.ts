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
  
  async create(createAddress: CreateAddressDto, userId: number): Promise<Address>{
      const address = this.addressRepository.create({...createAddress, user: {id: userId}})
      return this.addressRepository.save(address)
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

  async update(id: number, updateAddressDto: UpdateAddressDto) {
        const address = await this.addressRepository.findOne({ where: {id } })
        if(!address)
            throw new NotFoundException(`Endereço com ID ${id} não encontrado.`);
        Object.assign(address, updateAddressDto);
        return this.addressRepository.save(address);
  }

  async remove(id: number) {
    const result = await this.addressRepository.delete(id);

    if (!result.affected) throw new NotFoundException(`Endereço com ID ${id} não encontrado.`);
  }
}
