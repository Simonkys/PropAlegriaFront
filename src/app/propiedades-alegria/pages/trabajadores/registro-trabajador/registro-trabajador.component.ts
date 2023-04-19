import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormArray,
    FormBuilder,
    FormControl,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { KeyFilterModule } from 'primeng/keyfilter';
import { Message } from 'primeng/api';
import { DataService } from 'src/app/propiedades-alegria/services/data.service';
import { filter, finalize, map, switchMap, tap } from 'rxjs';
import {
    Comuna,
    Region,
} from 'src/app/propiedades-alegria/models/locaciones.models';
import { TrabajadorService } from 'src/app/propiedades-alegria/services/trabajador.service';
import { TipoTrabajador } from 'src/app/propiedades-alegria/models/tipo-trabajador.models';

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
        KeyFilterModule,
    ],
    templateUrl: './registro-trabajador.component.html',
    styleUrls: ['./registro-trabajador.component.scss'],
})
export class RegistroTrabajadorComponent {
    fb = inject(FormBuilder);
    dataService = inject(DataService);
    trabajadorService = inject(TrabajadorService);

    messages: Message[] = [];
    loading = false;

    tipoTrabajador$ = this.trabajadorService.getTipoDeTrabajadores();
    bancos$ = this.dataService.getBancos();
    tipoCuentas$ = this.dataService.getTipoCuentasBanco();

    regiones$ = this.dataService.getRegiones();
    regionControl = new FormControl<Region | null>(null);
    comunas$ = this.regionControl.valueChanges.pipe(
        filter((reg) => reg != null),
        map((reg) => reg as Region),
        switchMap((reg) => this.dataService.getComunasByRegion(reg.id)),
        tap(() => this.trabajadorForm.patchValue({ comuna: null }))
    );

    trabajadorForm = this.fb.group({
        rut_trab: [
            '',
            [
                Validators.required,
                Validators.pattern(/^[1-9][0-9]{6,8}-[0-9kK]$/),
            ],
        ],
        email: ['', [Validators.required, Validators.email]],
        pri_nom_trab: ['', [Validators.required]],
        seg_nom_trab: [''],
        pri_ape_trab: ['', [Validators.required]],
        seg_ape_trab: [''],
        celular: [
            '',
            [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(15),
            ],
        ],
        direccion: ['', [Validators.required]],
        comuna: new FormControl<Comuna | null>(null, [Validators.required]),
        tipo_trab: new FormControl<TipoTrabajador | null>(null, [
            Validators.required,
        ]),
        cuentas: new FormArray([]),
    });

    get cuentas(): FormArray {
        return this.trabajadorForm.get('cuentas') as FormArray;
    }

    updateFormData(key: string, event: any) {
        this.trabajadorForm.patchValue({
            [key]: event.value,
        });
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
        if (this.trabajadorForm.invalid) return;

        this.loading = true;
        const values = this.trabajadorForm.getRawValue();

        this.trabajadorService
            .createTrabajador({
                celular: Number(values.celular),
                comuna_id: values.comuna?.id!,
                tipo_trab: values.tipo_trab?.id!,
                direccion: values.direccion!,
                rut_trab: values.rut_trab!,
                pri_nom_trab: values.pri_nom_trab!,
                pri_ape_trab: values.pri_ape_trab!,
                seg_nom_trab: values.seg_nom_trab ?? undefined,
                seg_ape_trab: undefined,
            })
            .pipe(
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe({
                next: (res) => {},
                error: (err) => {
                    this.messages = [
                        {
                            severity: 'error',
                            summary: 'Error',
                            detail: JSON.stringify(err.error),
                        },
                    ];
                },
            });
    }
}
