export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
}

export interface Role {
    id: number;
    name: string;
}