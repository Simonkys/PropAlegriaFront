interface PropiedadComuna {
    id: number;
    nom_comuna: string;
}

interface PropiedadTipoPropiedad {
    id: number;
    nombre_tipoppdd: string;
}

interface PropiedadPropietario {
    id: number;
    rut_prop: string;
    pri_nom_prop: string;
    seg_nom_prop: string | null;
    pri_ape_prop: string;
    seg_ape_prop: string | null;
}

export interface Propiedad {
    id: number;

    direccion_ppdd: string;
    numero_ppdd: string | null;
    rol_ppdd: string | null;

    comuna: PropiedadComuna;
    propietario: PropiedadPropietario;
    tipopropiedad: PropiedadTipoPropiedad;

    cod: number | null;

    nro_bodega: number | null;
    nro_estacionamiento: number | null;

    valor_arriendo_base: number;
    es_valor_uf: boolean;

    gas: string | null;
    agua: string | null;
    luz: string | null;

    incluye_gc: boolean;
    valor_gasto_comun: number;

    observaciones: string | null;
}


export interface PropiedadForm {
    id?: number;

    direccion_ppdd: string;
    numero_ppdd: string | null;
    rol_ppdd: string | null;

    comuna_id: number;
    propietario_id: number;
    tipopropiedad_id: number;

    cod: number | null;

    nro_bodega: number | null;
    nro_estacionamiento: number | null;

    valor_arriendo_base: number;
    es_valor_uf: boolean;

    gas: string | null;
    agua: string | null;
    luz: string | null;

    incluye_gc: boolean;
    valor_gasto_comun: number;

    observaciones: string | null;
}



export interface PropiedadSimpleTabla {
    direccion: string;
    propietario: string;
    propietario_id: number;
    comuna: string;
    propiedad_id: number;
    tipo_propiedad: number;
}

export interface PropiedadConCodigos {
    cod: number;
    propiedad: PropiedadSimpleTabla | null;
}
