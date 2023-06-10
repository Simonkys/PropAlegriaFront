export interface ServiciosExtra {
    id: number;
    propiedad: number;
    nom_servicio: string;
    descripcion: string;
    fecha: Date;
    monto: number;
    nro_cuotas: number;
    monto_cuotas: number;
    contador_cuotas: number;
}

export interface ServiciosExtraForm {
    id?: number;
    propiedad: number;
    nom_servicio: string;
    descripcion: string;
    fecha: Date | null;
    monto: number;
    nro_cuotas: number;
}
