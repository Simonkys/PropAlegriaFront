interface ArriendoArrendatario {
    id: number;
    rut_arr: string;
    pri_nom_arr: string;
    pri_ape_arr: string;
}

interface ArriendoPropiedad {
    id: number;
    direccion_ppdd: string;
    numero_ppdd: string | null;
}

export interface Arriendo{
    id: number;

    cod_arriendo: string | null;

    fecha_inicio: Date;
    fecha_termino: Date;
    fecha_pri_ajuste: Date | null;

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
    fecha_termino: Date;
    fecha_pri_ajuste: Date | null;

    periodo_reajuste: number;
    monto_arriendo: number;

    fecha_entrega: Date | null;
    estado_arriendo: boolean;
    porcentaje_multa: number;

    arrendatario_id: number;
    propiedad_id: number | null;
}