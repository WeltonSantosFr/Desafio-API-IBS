import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

   create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.usersRepository.create(createUserDto)
      return this.usersRepository.save(newUser)
      
    } catch (error) {
      throw new BadRequestException("Erro ao criar usuário")
    }
  }

  findAll() {
    try {
      return this.usersRepository.find()
    } catch (error) {
      throw new InternalServerErrorException("Algo ruim aconteceu")
    }
  }

  findOne(id: string) {
    try {
      return this.usersRepository.findOne({where:{id}})
    } catch (error) {
      throw new NotFoundException("Usuário não encontrado")
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    try {
      this.usersRepository.update(id, updateUserDto)
      return this.usersRepository.findOne({where:{id}})
    } catch (error) {
      throw new BadRequestException("Erro ao atualizar usuário")
    }
  }

  remove(id: string) {
    try {
      this.usersRepository.delete(id)
      return {message: "Usuário excluido com sucesso"}
    } catch (error) {
      throw new BadRequestException("Erro ao excluir usuário")
    }
  }
}
