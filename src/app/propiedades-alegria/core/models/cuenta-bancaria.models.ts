export interface CuentaBancaria {
    id?: number;
    cuenta: number;
    estado_cuenta: string;
    propietario_rut?: string;
    banco_id: BancoId;
    tipocuenta_id: TipoCuentaId;
}

export interface BancoId{
    id: number;
    nombre_banco: string;
}

export interface TipoCuentaId{
    id: number;
    nom_cuenta: string;
}
