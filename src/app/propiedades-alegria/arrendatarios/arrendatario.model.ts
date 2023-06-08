import { DetalleArriendo } from "../core/models/detalle-arriendo.model";

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




export interface ArriendoArrendatario{
    id: number;

    propiedad: number;
    arrendatario: number;

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
    detalle_arriendos: DetalleArriendo[]

}


export interface ArrendatarioArriendo extends Arrendatario {
    arriendo: ArriendoArrendatario | null;
}