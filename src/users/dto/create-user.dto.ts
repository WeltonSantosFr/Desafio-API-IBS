import { Address } from "src/address/entities/address.entity"
import { DeepPartial } from "typeorm"

export class CreateUserDto {
    id: string
    name: string
    gender: string
    birthDate: Date
    maritalStatus: string
}