export interface Usuario {
    id: number;
    username: string;
    email: string;
    is_active: boolean;
}

export interface CreateUserForm {
    username: string;
    email: string;
    password: string;
}