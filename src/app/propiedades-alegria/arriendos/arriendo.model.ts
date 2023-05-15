interface ArriendoArrendatario {
    id: number;
    rut_arr: string;
    pri_nom_arr: string;
    seg_nom_arr: string | null;
    pri_ape_arr: string;
    seg_ape_arr: string | null;
    correo_arr: string;
}

interface ArriendoPropiedad {
    id: number;
}

export interface Arriendo{
    id: number;

    cod_arriendo: string | null;
    fecha_inicio: Date;
    fech_termino: Date;
    fecha_pri_ajuste: Date;
    periodo_reajuste: number;
    monto_arriendo: number;
    fecha_entrega: Date | null;
    estado_arriendo: boolean;
    porcentaje_multa: number;

    arrendatario: ArriendoArrendatario;
    propiedad: ArriendoPropiedad | null;
}

export interface ArriendoForm{
    id?: number;

    cod_arriendo: string | null;
    fecha_inicio: Date;
    fech_termino: Date;
    fecha_pri_ajuste: Date;
    periodo_reajuste: number;
    monto_arriendo: number;
    fecha_entrega: Date | null;
    estado_arriendo: boolean;
    porcentaje_multa: number;

    arrendatario_id: number;
    propiedad_id: number | null;
}