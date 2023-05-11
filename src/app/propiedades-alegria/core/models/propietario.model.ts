export interface PropietarioComuna {
    id: number;
    nom_com: string;
}

export interface Propietario{
    id:             number;
    rut_prop:       string;
    pri_nom_prop:   string;
    seg_nom_prop:   null | string;
    pri_ape_prop:   string;
    seg_ape_prop:   null | string;
    direccion_prop: string;
    email_prop:     string;
    contacto_prop:  number;
    comuna:      PropietarioComuna;
}

export interface PropietarioForm {
    id?:             number;
    rut_prop:       string;
    pri_nom_prop:   string;
    seg_nom_prop:   null | string;
    pri_ape_prop:   string;
    seg_ape_prop:   null | string;
    direccion_prop: string;
    email_prop:     string;
    contacto_prop:  number;
    comuna_id:      number;
}