import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto.name || !createUserDto.gender || !createUserDto.birthDate || !createUserDto.maritalStatus) {
      throw new BadRequestException()
    }
    const newUser = this.usersRepository.create(createUserDto)
    return await this.usersRepository.save(newUser)
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find()
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException("Usuário não encontrado")
    }
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException("Usuário não encontrado")
    }
    if (Object.keys(updateUserDto).length === 0) {
      throw new BadRequestException("Nenhum campo para atualização fornecido");
    }
    await this.usersRepository.update(id, updateUserDto)
    return await this.usersRepository.findOne({ where: { id } })
  }

  async remove(id: string): Promise<{ message: string }> {
    const user = await this.usersRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException("Usuário não encontrado")
    }
    await this.usersRepository.delete(id)
    return { message: "Usuário excluido com sucesso" }
  }
}
