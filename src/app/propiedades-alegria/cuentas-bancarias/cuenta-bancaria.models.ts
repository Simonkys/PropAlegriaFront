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

    rut_tercero: string | null;

    banco: CuentaBancariaBanco;
    tipocuenta: CuentaBancariaTipoCuenta;
}

export interface CuentaBancariaForm {
    id?: number;
   
    cuenta: number;
    estado_cuenta: string;
    propietario_rut?: string;

    banco_id: number;
    tipocuenta_id: number;

    rut_tercero: string | null;
}



