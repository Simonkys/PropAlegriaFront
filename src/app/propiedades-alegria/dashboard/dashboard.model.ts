export interface ArriendoMultaDashboard {
    propiedad_cod: number;
    arrendatario: string;
    cuenta: string;
    fecha_pago: Date;
    valor_arriendo: number;
    valor_diario: number;
    porcentaje: number;
    multa: number;
    dias_multa: number;
}

export interface DashboardMetrics {
    total_arriendos_mes:       number;
    total_arriendos_pagados:   number;
    total_arriendos_por_pagar: number;
    propiedades_con_reajuste:  number;
    total_propiedades:         number;
    total_arriendos:           number;
    sin_arrendar:              number;
}
