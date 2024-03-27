import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from './create-address.dto';

export class UpdateAddressDto {
    cep: string
    address: string
    number: string
    complement: string
    district: string
    state: string
    city: string
}
