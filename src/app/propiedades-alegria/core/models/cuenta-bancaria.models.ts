interface CuentaBancariaTipoCuenta {
    id: number;
    nom_cuenta: string;
}

interface CuentaBancariaBanco {
    id: number;
    nombre_banco: string;
}

export interface CuentaBancaria {
    id?: number;
   
    cuenta: number;
    estado_cuenta: string;
    propietario_rut?: string;

    banco_id: CuentaBancariaBanco;
    tipocuenta_id: CuentaBancariaTipoCuenta;
}



