import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormArray,
    FormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { Message } from 'primeng/api';

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
        TooltipModule,
        MessagesModule,
    ],
    templateUrl: './registro-trabajador.component.html',
    styleUrls: ['./registro-trabajador.component.scss'],
})
export class RegistroTrabajadorComponent {
    fb = inject(FormBuilder);

    messages: Message[] = [];
    loading = false;

    trabajadorForm = this.fb.group({
        rut_trab: [
            '',
            [
                Validators.required,
                Validators.pattern(/^[1-9][0-9]{6,8}-[0-9kK]$/),
            ],
        ],
        email: ['', [Validators.required, Validators.email]],
        pri_nom_trab: [''],
        seg_nom_trab: [''],
        pri_ape_trab: [''],
        seg_ape_trab: [''],
        celular: [''],
        direccion: [''],
        comuna_id: [''],
        tipo_trab: [''],
        cuentas: new FormArray([]),
    });

    get cuentas(): FormArray {
        return this.trabajadorForm.get('cuentas') as FormArray;
    }

    nuevaCuentaBancaria() {
        return this.fb.group({
            nro_cuenta: ['', [Validators.required]],
            tipo_cuenta: ['', [Validators.required]],
            banco: ['', [Validators.required]],
        });
    }

    agregarCuenta() {
        if (this.cuentas.length >= 3) {
            return;
        }
        this.cuentas.push(this.nuevaCuentaBancaria());
    }

    removerCuenta(idx: number) {
        this.cuentas.removeAt(idx);
    }

    guardarTrabajador() {
        console.log(this.trabajadorForm.getRawValue());
        this.messages = [
            {
                severity: 'error',
                summary: 'Error',
                detail: 'Credenciales inválidas',
            },
        ];
    }

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
