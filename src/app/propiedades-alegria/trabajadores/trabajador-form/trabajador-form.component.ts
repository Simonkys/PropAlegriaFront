import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormBuilder,
    FormControl,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TrabajadorService } from 'src/app/propiedades-alegria/trabajadores/trabajador.service';
import { UbicacionFormComponent } from '../../ubicaciones/ubicacion-form/ubicacion-form.component';
import { TipoTrabajador, Trabajador } from '../trabajador.model';


@Component({
    selector: 'app-trabajador-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        DropdownModule,
        ButtonModule,
        TooltipModule,
        KeyFilterModule,
        UbicacionFormComponent
    ],
    templateUrl: './trabajador-form.component.html',
    styleUrls: ['./trabajador-form.component.scss'],
})
export class TrabajadorFormComponent implements OnInit {
    
    fb = inject(FormBuilder);
    trabajadorService = inject(TrabajadorService);
    
    @Input() trabajador?: Trabajador
    @Output() saveEvent = new EventEmitter<Trabajador>()
    @Output() cancelEvent = new EventEmitter<boolean>()


    tipoTrabajador$ = this.trabajadorService.getTipoDeTrabajadores();


    trabajadorForm = this.fb.group({
        rut_trab: [
            '',
            [
                Validators.required,
                Validators.pattern(/^(\d{1,2}(?:\.\d{1,3}){2}-[\dkK])$/),
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
        tipo_trab: new FormControl<number | null>(null, [
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
                tipo_trab: this.trabajador.tipo_trab,
                direccion: this.trabajador.direccion
            })
        }
    }

    cancelar() {
        this.cancelEvent.emit(true)
    }

    handleSelectedComuna(comunaId: number | null){
        this.trabajadorForm.patchValue({comuna_id: comunaId})
    }

    guardarTrabajador() {
        if (this.trabajadorForm.invalid) return;


        const values = this.trabajadorForm.getRawValue();
        const trabajador = {
          celular: Number(values.celular),
          comuna_id: Number(values.comuna_id),
          tipo_trab: values.tipo_trab,
          direccion: values.direccion!,
          rut_trab: values.rut_trab!,
          pri_nom_trab: values.pri_nom_trab!,
          pri_ape_trab: values.pri_ape_trab!,
          seg_nom_trab: values.seg_nom_trab!,
          seg_ape_trab: values.seg_ape_trab!,
      } as Trabajador
      this.saveEvent.emit({...trabajador, id: this.trabajador?.id})
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
