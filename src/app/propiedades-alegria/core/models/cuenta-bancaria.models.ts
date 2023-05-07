export interface CuentaBancaria {
    id?: number;
    cuenta: number;
    estado_cuenta: string;
    propietario_rut?: string;
    banco_id: number;
    tipocuenta_id: number;
}