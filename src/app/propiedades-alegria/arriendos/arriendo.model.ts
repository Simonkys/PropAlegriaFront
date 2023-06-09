import { DetalleArriendo } from "../core/models/detalle-arriendo.model";

export interface ArriendoForm{
    id?: number;

    fecha_inicio: Date;
    fecha_termino: Date;

    dia_pago: number;

    periodo_reajuste: number;

    valor_arriendo: number;

    fecha_entrega: Date | null;

    observaciones: string | null;

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


export interface Arriendo{
    id: number;

    propiedad: Propiedad | null;
    arrendatario: Arrendatario;

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
    detalle_arriendos: DetalleArriendo[];


}

export interface Arrendatario {
    id:           number;
    rut_arr:      string;
    pri_nom_arr:  string;
    seg_nom_arr:  string | null;
    pri_ape_arr:  string;
    seg_ape_arr:  string | null;
    contacto_arr: number;
    correo_arr:   string;
    estado:       boolean;
    saldo:        number;
}

export interface Propiedad {
    id:                  number;
    direccion_ppdd:      string | null;
    numero_ppdd:         string | null;
    rol_ppdd:            null | null;
    cod:                 number | null;
    nro_bodega:          null | null;
    nro_estacionamiento: null | null;
    valor_arriendo_base: number;
    es_valor_uf:         boolean;
    gas:                 string | null;
    agua:                string | null;
    luz:                 string | null;
    incluye_gc:          boolean;
    valor_gasto_comun:   number;
    comuna:              Comuna;
    propietario:         Propietario;
    tipopropiedad:       Tipopropiedad;
    externo:             number | null;
    observaciones: string | null;
}

export interface Comuna {
    id:      number;
    nom_com: string;
    reg_id:  number;
}

export interface Propietario {
    id:                    number;
    rut_prop:              string;
    pri_nom_prop:          string;
    seg_nom_prop:          string | null;
    pri_ape_prop:          string;
    seg_ape_prop:          string | null;
    direccion_prop:        string;
    email_prop:            string;
    contacto_prop:         number;
    pctje_cobro_honorario: number;
    comuna:                number;
    personalidad_juridica: number | null;
    cuentas_bancarias: Cuentasbancaria[];
}

export interface Tipopropiedad {
    id:                   number;
    nombre_tipoppdd:      string;
    descripcion_tipoppdd: string;
}

export interface Cuentasbancaria {
    id: number;
    banco: Banco;
    tipocuenta: Tipocuenta;
    cuenta: number;
    estado_cuenta: string;
    propietario_rut: string;
    rut_tercero?: any;
  }

export interface Tipocuenta {
    id: number;
    nom_cuenta: string;
  }

export interface Banco {
    id: number;
    nombre_banco: string;
  }
