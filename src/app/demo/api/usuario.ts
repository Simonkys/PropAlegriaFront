export interface Usuario {
    username: string;
    email: string;
}

export interface Auth {
    Token: string;
    Usuario: Usuario;
    Mensaje: string;
}
