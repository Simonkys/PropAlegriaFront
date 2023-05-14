export interface Arrendatario {
    id: number;
    rut_arr: string;
    pri_nom_arr: string;
    seg_nom_arr: string | null;
    pri_ape_arr: string;
    seg_ape_arr: string | null;
    contacto_arr: string;
    correo_arr: string;
    estado: boolean;
    saldo: number;
}

export interface ArrendatarioForm {
    id?: number;
    rut_arr: string;
    pri_nom_arr: string;
    seg_nom_arr: string | null;
    pri_ape_arr: string;
    seg_ape_arr: string | null;
    contacto_arr: string;
    correo_arr: string;
    estado: boolean;
    saldo: number;
}