import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
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
import { finalize } from 'rxjs';
import { TrabajadorService } from 'src/app/propiedades-alegria/trabajadores/trabajador.service';
import { Router } from '@angular/router';
import { UbicacionFormComponent } from '../../ubicaciones/ubicacion-form/ubicacion-form.component';
import { TipoTrabajador, Trabajador } from '../trabajador.model';
import { Utils } from '../../utils/utils';

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
        UbicacionFormComponent
    ],
    templateUrl: './registro-trabajador.component.html',
    styleUrls: ['./registro-trabajador.component.scss'],
})
export class RegistroTrabajadorComponent implements OnInit {
    
    fb = inject(FormBuilder);
    trabajadorService = inject(TrabajadorService);
    router = inject(Router);


    @Input() trabajador?: Trabajador

    messages: Message[] = [];
    loading = false;

    tipoTrabajador$ = this.trabajadorService.getTipoDeTrabajadores();


    trabajadorForm = this.fb.group({
        rut_trab: [
            '',
            [
                Validators.required,
                Validators.pattern(/^[1-9][0-9]{6,7}-[0-9kK]$/),
            ],
        ],
        pri_nom_trab: ['', [Validators.required]],
        seg_nom_trab: ['', [Validators.required]],
        pri_ape_trab: ['', [Validators.required]],
        seg_ape_trab: ['', [Validators.required]],
        comuna_id: new FormControl<number | null>(null, [Validators.required]),
        celular: [
            '',
            [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(15),
            ],
        ],
        direccion: ['', [Validators.required]],
        tipo_trab: new FormControl<TipoTrabajador | null>(null, [
            Validators.required,
        ]),
    });

    ngOnInit(): void {
        if(this.trabajador) {
            this.trabajadorForm.patchValue({
                rut_trab: this.trabajador.rut_trab,
                pri_nom_trab: this.trabajador.pri_nom_trab,
                seg_nom_trab: this.trabajador.seg_nom_trab,
                pri_ape_trab: this.trabajador.pri_ape_trab,
                seg_ape_trab: this.trabajador.seg_ape_trab,
                comuna_id: this.trabajador.comuna_id,
                celular: String(this.trabajador.celular),
            })
        }
    }

    cancelar() {
        this.router.navigate(['trabajadores/listado']);
    }

    handleSelectedComuna(comunaId: number | null){
        this.trabajadorForm.patchValue({comuna_id: comunaId})
    }

    guardarTrabajador() {
        if (this.trabajadorForm.invalid) return;

        this.loading = true;
        const values = this.trabajadorForm.getRawValue();

        this.trabajadorService
            .crearTrabajador({
                celular: Number(values.celular),
                comuna_id: Number(values.comuna_id),
                tipo_trab: values.tipo_trab!.id,
                direccion: values.direccion!,
                rut_trab: Utils.rutFormatter(values.rut_trab!),
                pri_nom_trab: values.pri_nom_trab!,
                pri_ape_trab: values.pri_ape_trab!,
                seg_nom_trab: values.seg_nom_trab!,
                seg_ape_trab: values.seg_ape_trab!,
            })
            .pipe(
                finalize(() => {
                    window.scrollTo(0, 0);
                    this.loading = false;
                })
            )
            .subscribe({
                next: (res) => {
                    this.router.navigate(['trabajadores/listado'])
                },
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

    /*
    cuentas = new FormArray<FormGroup>([]);

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
    */
}
