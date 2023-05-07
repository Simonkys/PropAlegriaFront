export interface Banco {
    id: number;
    nombre_banco: string;
    cod_banco: string;
}

export interface TipoCuenta {
    id: number;
    nom_cuenta: string;
}


export interface CuentaBancaria {
    id?: number;
    cuenta: number;
    estado_cuenta: string;
    propietario_rut?: string;
    banco_id: number;
    tipocuenta_id: number;
}