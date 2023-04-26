export interface Auth {
    Token: string;
    Usuario: {
        username: string;
        email: string;
    };
    Mensaje: string;
    Tipo_trabajador: number;
}


export enum TipoUsuario {
    GERENTE = 1,
    SECRETARIA_ADMIN = 2,
    EJECUTIVO_VENTAS = 3
}