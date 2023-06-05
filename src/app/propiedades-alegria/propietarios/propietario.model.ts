export interface PersonalidadJuridica{
    id?: number;
    rut: string;
    razon_social: string;
    direccion: string | null;
    comuna: number | null;
    nom_com?: string | null;
    email: string | null;
    contacto: number | null;
}

export interface PropietarioComuna {
    id:             number;
    nom_comuna:     string;
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
    comuna:         PropietarioComuna;
    contacto_prop:  number;
    pctje_cobro_honorario: number;
    personalidad_juridica: PersonalidadJuridica | null;
}

export interface PropietarioForm {
    id?:            number;
    rut_prop:       string;
    pri_nom_prop:   string;
    seg_nom_prop:   null | string;
    pri_ape_prop:   string;
    seg_ape_prop:   null | string;
    direccion_prop: string;
    comuna_id:      number;
    email_prop:     string;
    contacto_prop:  number;
    pctje_cobro_honorario: number;
    personalidad_juridica: PersonalidadJuridica | null;

}