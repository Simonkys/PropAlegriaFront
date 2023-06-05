interface Externo {
    id: number;
    nombre: string;
    rut: string | null;
    contacto: number;
    correo: string;
    rol: string;
}

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

    propiedad: ArriendoPropiedad | null;
    arrendatario: ArriendoArrendatario;

    fecha_inicio: Date;
    fecha_termino: Date;

    dia_pago: number;
    comision: number | null;

    periodo_reajuste: number;
    fecha_reajuste: Date;

    valor_arriendo: number;

    fecha_entrega: Date | null;
    estado_arriendo: boolean;

    observaciones: string | null;

    externo: Externo;
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


export interface TablaArriendo {
    arriendo_id: number;
    propiedad_cod: number | null;
    nombre_arrendatario: string;
    direccion: string;
    fecha_pago: Date;
    valor_arriendo: number;
}