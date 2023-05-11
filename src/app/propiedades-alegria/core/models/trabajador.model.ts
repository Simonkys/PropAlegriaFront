export interface TipoTrabajador {
    id: number;
    tipo: string;
    descripcion: string;
}

export enum TipoTrabajadorEnum {
    GERENTE = 1,
    SECRETARIA_ADMIN = 2,
    EJECUTIVO_VENTAS = 3
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

    comuna_id: TrabajadorComuna;
    tipo_trab: TrabajadorTipoTrabajador;

    usuario_id: number | null;
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
    tipo_trab: number;

    usuario_id: number | null;
    email: string | null;
}