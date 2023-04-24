export interface BaseUser {
    username: string;
    email: string;
}

export interface Auth {
    Token: string;
    Usuario: BaseUser;
    Mensaje: string;
    Tipo_trabajador: number;
}

export interface CreateUserForm extends BaseUser {
    password: string;
}


export enum TipoUsuario {
    GERENTE = 1,
    SECRETARIA_ADMIN = 2,
    EJECUTIVO_VENTAS = 3
}