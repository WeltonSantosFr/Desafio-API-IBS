export interface User {
    id: string
    name: string
    gender: string
    birthDate: string
    maritalStatus: string
    createdAt: Date
    updatedAt: Date
}

export interface EditUserFormData {
    name?: string | null;
    gender?: string | null;
    birthDate?: string | null;
    maritalStatus?: string | null;
    [key: string]: string | null |undefined ;
}