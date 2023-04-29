import { Usuario } from "../usuarios/usuario.model";

export interface Auth {
    token: string;
    usuario: Usuario;
    mensaje: string;
}
