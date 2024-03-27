import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { LoginAdminDto } from './dto/login-admin.dto';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminsRepository: Repository<Admin>
  ) { }

  async login(loginAdminDto: LoginAdminDto): Promise<{token:string}> {
    const admin = await this.adminsRepository.findOne({where: {email:loginAdminDto.email}})
    if(!admin) {
      console.log("nao encontrou o admin")
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isValidPassword = await bcrypt.compare(loginAdminDto.password, admin.password)
    if(!isValidPassword) {
      console.log("nao validou a senha")
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const token = jwt.sign({email: admin.email, id:admin.id}, process.env.SECRET_KEY, {expiresIn: '1d'})
    return {token:token}
  }

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const newAdmin = this.adminsRepository.create({...createAdminDto, password: bcrypt.hashSync(createAdminDto.password, 10)})
    return await this.adminsRepository.save(newAdmin)
  }

  async findAll(): Promise<Admin[]> {
    return await this.adminsRepository.find()
  }

  async findOne(id: string): Promise<Admin> {
    return await this.adminsRepository.findOne({ where: { id } })
  }

  async update(id: string, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    await this.adminsRepository.update(id, updateAdminDto)
    return await this.adminsRepository.findOne({ where: { id } })
  }

  async remove(id: string): Promise<{message:string}> {
    await this.adminsRepository.delete(id)
    return {message: "Admin excluido com sucesso"}
  }
}
