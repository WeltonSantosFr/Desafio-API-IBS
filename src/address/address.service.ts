import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }
  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    if (!createAddressDto.cep || !createAddressDto.address || !createAddressDto.number || !createAddressDto.district || !createAddressDto.state || !createAddressDto.city || !createAddressDto.user) {
      throw new BadRequestException()
    }
    const user = await this.userRepository.findOne({ where: { id: createAddressDto.user } })
    if (!user) {
      throw new NotFoundException("Usuário não encontrado")
    }
    const newAddress = this.addressRepository.create({ ...createAddressDto, user })
    return await this.addressRepository.save(newAddress)
  }

  async findAll(): Promise<Address[]> {
    return await this.addressRepository.find()
  }

  async findOne(id: string): Promise<Address> {
    const address = await this.addressRepository.findOne({ where: { id } })
    if (!address) {
      throw new NotFoundException("Endereço não encontrado")
    }
    return address
  }

  async update(id: string, updateAddressDto: UpdateAddressDto): Promise<Address> {
    await this.addressRepository.update(id, updateAddressDto)
    return await this.addressRepository.findOne({ where: { id } })
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.addressRepository.delete(id)
    return { message: "Endereço excluido com sucesso" }
  }
}
