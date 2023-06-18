export interface TipoTrabajador {
    id: number;
    tipo: string;
    descripcion: string;
}


export interface TrabajadorTipoTrabajador {
    id: number;
    tipo: string;
}

export interface TrabajadorComuna {
    id: number;
    nom_com: string;
}


export interface Trabajador {
    id?: number;

    rut_trab: string;

    pri_nom_trab: string;
    seg_nom_trab: string | null;
    pri_ape_trab: string;
    seg_ape_trab: string | null;
    direccion: string;

    celular: number;

    comuna: TrabajadorComuna;
    tipo_trab: TrabajadorTipoTrabajador;

    email: string | null;
}

export interface TrabajadorForm {
    id?: number;

    rut_trab: string;

    pri_nom_trab: string;
    seg_nom_trab: string | null;
    pri_ape_trab: string;
    seg_ape_trab: string | null;
    direccion: string;

    celular: number;

    comuna_id: number;
    tipo_trab_id: number;
    usuario?: number;

    email: string | null;
}