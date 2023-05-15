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

export interface TrabajadorUsuario {
    id: number;
    username: string;
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

    usuario_id: TrabajadorUsuario | null;
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