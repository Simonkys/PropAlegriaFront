export interface DetalleArriendo {
    id: number;
    arriendo: number;
    fecha_a_pagar: Date;
    monto_a_pagar: number | null;
    fecha_pagada: Date | null;
    monto_pagado: number | null;
    valor_multa: number;
    toca_reajuste: boolean;
}