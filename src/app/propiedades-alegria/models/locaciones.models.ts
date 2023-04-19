export interface Region {
    id: number;
    orden: number;
    nom_reg: string;
}

export interface Comuna {
    id: number;
    nom_com: string;
    reg_id: number;
}
