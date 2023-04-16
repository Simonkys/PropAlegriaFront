import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'app-registro-trabajador',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        ButtonModule,
        TooltipModule
    ],
    templateUrl: './registro-trabajador.component.html',
    styleUrls: ['./registro-trabajador.component.scss'],
})
export class RegistroTrabajadorComponent {
    fb = inject(FormBuilder);

    trabajadorForm = this.fb.group({
        rut_trab: [''],
        email: [''],
        pri_nom_trab: [''],
        seg_nom_trab: [''],
        pri_ape_trab: [''],
        seg_ape_trab: [''],
        celular: [''],
        direccion: [''],
        comuna_id: [''],
        tipo_trab: [''],
        cuentas: this.fb.array([]),
    });

    get cuentas(): FormArray {
        return this.trabajadorForm.get('cuentas') as FormArray;
    }

    nuevaCuentaBancaria() {
        return this.fb.group({
            nro_cuenta: [''],
            tipo_cuenta: [''],
            banco: [''],
        });
    }

    agregarCuenta() {
      if (this.cuentas.length >= 3) { return;}
      this.cuentas.push(this.nuevaCuentaBancaria());
    }

    removerCuenta(idx: number) {
        this.cuentas.removeAt(idx);
    }

    guardarTrabajador() {}

    opcionesTipoTrabajador = [
        {
            id: 1,
            name: 'TIPO1',
        },
        {
            id: 2,
            name: 'TIPO2',
        },
    ];

    opcionesComuna = [
        {
            id: 1,
            name: 'Concepción',
        },
        {
            id: 2,
            name: 'Talcahuano',
        },
    ];

    opcionesBanco = [
        {
            id: 1,
            name: 'Banco Estado',
        },
        {
            id: 2,
            name: 'Banco de Chile | Edwards',
        },
        {
            id: 3,
            name: 'BCI',
        },
        {
            id: 4,
            name: 'Scotiabanck',
        },
    ];

    opcionesTipoCuenta = [
        {
            id: 1,
            name: 'Cuenta vista',
        },
        {
            id: 2,
            name: 'Cuenta corriente',
        },
    ];
}
