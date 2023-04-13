export interface User {
    username: string;
    email: string;
    tipo_usuario: string;
}

export interface Auth {
    Token: string;
    Usuario: User;
    Mensaje: string;
}
