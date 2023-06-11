export interface DashboardAtrasados{
    propiedad_cod: number;
    propiedad_id: number;
    arrendatarios_nom: string;
    fecha_pago: Date;
    dias_atraso: number;
}

export interface DashboardMetrics {
    total_arriendos_mes:       number;
    total_arriendos_pagados:   number;
    total_arriendos_por_pagar: number;
    propiedades_con_reajuste:  number;
    total_propiedades:         number;
    total_arriendos:           number;
    sin_arrendar:              number;
    atrasados: DashboardAtrasados[];
}
