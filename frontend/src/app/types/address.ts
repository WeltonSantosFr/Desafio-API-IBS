import { User } from "./user"

export interface Address {
    id:string
    cep:string
    address:string
    number:string
    complement:string
    district:string
    state:string
    city:string
    createdAt:Date
    updatedAt:Date
    user: User
}

export interface CreateAddressFormData {
    cep: string;
    address: string;
    number: string;
    complement?: string;
    district: string;
    state:string;
    city:string;
    user:string
    [key: string]: string | null| undefined;
}

export interface EditAddressFormData {
    cep?: string | null;
    address?: string | null;
    number?: string | null;
    complement?: string | null;
    district?: string | null;
    state?:string | null;
    city?:string | null;
    user?:string | null;
    [key: string]: string | null | undefined;
}

export interface Cep {
    cep:string
    logradouro:string
    bairro:string
    localidade:string
    uf:string
    siafi:string
    ibge:string
    gia:string
    ddd:string
    complemento:string
}