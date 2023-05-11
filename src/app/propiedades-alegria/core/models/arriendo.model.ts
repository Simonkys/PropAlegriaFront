interface ArriendoArrendatario {
    id: string;
    rut_arr: string;
    pri_nom_arr: string;
    seg_nom_arr: string | null;
    pri_ape_arr: string;
    seg_ape_arr: string | null;
    correo_arr: string;
}

export interface Arriendo{
    id?: number;
    cod_arriendo: number;
    fecha_inicio: Date;
    fech_termino: Date;
    fecha_pri_ajuste: Date;
    periodo_reajuste: Date;
    monto_arriendo: number;
    fecha_entrega: Date;
    estado_arriendo: string;
    porcentaje_multa: number;

    arrendatario_id: ArriendoArrendatario;
}