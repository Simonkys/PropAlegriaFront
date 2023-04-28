export interface Usuario {
    id: number;
    username: string;
    email: string;
    is_staff: boolean;
    is_superuser: boolean;
}

export interface CreateUserForm {
    username: string;
    email: string;
    password: string;
    is_staff: boolean;
    is_superuser: boolean;
}