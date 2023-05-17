interface PropiedadComuna {
    id: number;
    nom_comuna: string;
}

interface PropiedadTipoPropiedad {
    id:              number;
    nombre_tipoppdd: string;
}

interface PropiedadPropietario {
    id:           number;
    rut_prop:     string;
    pri_nom_prop: string;
    seg_nom_prop: string | null;
    pri_ape_prop: string;
    seg_ape_prop: string | null;
}

export interface Propiedad {
    id:               number;

    direccion_ppdd:   string;
    numero_ppdd:      number | null;
    rol_ppdd:         string | null;

    comuna:        PropiedadComuna;
    propietario:   PropiedadPropietario;
    tipopropiedad: PropiedadTipoPropiedad;

    nro_bodega: number | null;
    nro_estacionamiento: number | null;
}


export interface PropiedadForm {
    id?: number;

    direccion_ppdd:   string;
    numero_ppdd:      number | null;
    rol_ppdd:         string | null;
    comuna_id:        number;
    propietario_id:   number;
    tipopropiedad_id: number;
}

export interface Bodega {
    numero_bodega: number;
    bodega_independiente: boolean;
}

export interface Estacionamiento {
    numero_estacionamiento: number;
    estacionamiento_independiente: boolean;
}


export interface RegistroPropiedadForm {
    direccion_ppdd:   string;
    numero_ppdd:      number | null;
    rol_ppdd:         string | null;
    comuna:        number;
    propietario:   number;
    tipopropiedad: number;

    bodega: Bodega | null;
    estacionamiento: Estacionamiento | null;
}
