export interface Propiedad {
    id:               number;
    direccion_ppdd:   string;
    numero_ppdd:      number | null;
    rol_ppdd:         string | null;
    comuna_id:        number;
    propietario_id:   number;
    tipopropiedad_id: number;
}

