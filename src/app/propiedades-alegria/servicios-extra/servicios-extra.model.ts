export interface ServiciosExtra {
    id: number;
    propiedad: number | null;
    nom_servicio: string;
    descripcion: string;
    fecha: Date | null;
    monto: number;
    nro_cuotas: number;
    monto_cuotas: number;
    contador_cuotas: number;
}

export interface ServiciosExtraForm {
    id?: number;
    propiedad: number | null;
    nom_servicio: string;
    descripcion: string;
    fecha: Date | null;
    monto: number;
    nro_cuotas: number;
    monto_cuotas: number;
    contador_cuotas: number;
}

export interface ServiciosExtraTable {
    id: number;
    propiedad: number | null;
    nom_servicio: string;
    fecha: Date | null;
    monto: number;
}
