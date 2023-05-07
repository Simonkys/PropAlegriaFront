export interface Propiedad {
    id:               number;
    direccion_ppdd:   string;
    numero_ppdd:      number;
    rol_ppdd:         string | null;
    comuna_id:        number;
    propietario_id:   number;
    tipopropiedad_id: number;
}

export interface TipoPropiedad {
    id:                   number;
    nombre_tipoppdd:      string;
    descripcion_tipoppdd: string;
}