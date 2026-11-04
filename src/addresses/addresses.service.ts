import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAddressDto } from './dto/update-address.dto.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity.js';
import { CreateAddressDto } from './dto/create-address.dto.js';
import { User } from '../auth/user.entity.js';

@Injectable()
export class AddressesService {

  constructor (
          @InjectRepository(Address)
          private readonly addressRepository: Repository<Address>,
          @InjectRepository(User)
          private readonly userRepository: Repository<User>,
      ){}
  
  async create(createAddress: CreateAddressDto, userId: number): Promise<Address>{
      const address = this.addressRepository.create(createAddress)
      const user = await this.userRepository.findOne({
        where: { id: userId }
      });

      if (!user) {
        throw new NotFoundException(`Usuário ${userId} não encontrado.`);
      }
      address.user = user
      return this.addressRepository.save(address)
  }

  async findAll(userId: number): Promise<Address[]> {
    return this.addressRepository.find({
      where: {
        user: {
          id: userId
        }
      }
    });
  }

  async findById(id: number, userId: number): Promise<Address> {
        let address = await this.addressRepository.findOne(
          { where: { id: id, user: {id: userId} } })
        if(!address)
            throw new NotFoundException(`Endereço com ID ${id} não encontrado.`);
        return address;
    }

  async update(id: number, updateAddressDto: UpdateAddressDto, userId: number) {
        const address = await this.addressRepository.findOne({ where: {id: id, user: {id:userId}} })
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
