interface PropiedadComuna {
    id: number;
    nom_com: string;
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
    numero_ppdd:      number;
    rol_ppdd:         string | null;
    comuna_id:        PropiedadComuna;
    propietario_id:   PropiedadPropietario;
    tipopropiedad_id: PropiedadTipoPropiedad;
}

