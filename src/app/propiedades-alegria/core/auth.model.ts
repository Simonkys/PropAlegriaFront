import { Usuario } from "../usuarios/usuario.model";

export interface Auth {
    Token: string;
    Usuario: Usuario;
    Mensaje: string;
    Tipo_trabajador: number;
}
