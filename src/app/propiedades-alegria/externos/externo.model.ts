export interface Externo {
    id: number;
    nombre: string;
    rut: string | null;
    contacto: number;
    correo: string;
    rol: string;
}

export interface ExternoForm {
    id?: number;
    nombre: string;
    rut: string | null;
    contacto: number;
    correo: string;
    rol: string;
}