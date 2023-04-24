export interface User {
    username: string;
    email: string;
    tipo_usuario: string;
}

export interface Auth {
    Token: string;
    Usuario: User;
    Mensaje: string;
    Tipo_usuario: number;
}


export enum TipoUsuario {
    GERENTE = 1,
    SECRETARIA_ADMIN = 2,
    EJECUTIVO_VENTAS = 3
}