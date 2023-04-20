export interface Trabajador {
    id?: number;
    rut_trab: string;
    pri_nom_trab: string;
    seg_nom_trab?: string;
    pri_ape_trab: string;
    seg_ape_trab?: string;
    celular: number;
    direccion: string;
    comuna_id: number;
    tipo_trab: number;
    usuario_id?: number;
}

export class TrabajadorModel {
    constructor() {}
}
