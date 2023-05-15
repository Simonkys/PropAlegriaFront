import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TrabajadorService } from 'src/app/propiedades-alegria/trabajadores/trabajador.service';
import { UbicacionFormComponent } from '../../../componentes/ubicacion-form/ubicacion-form.component';
import { Trabajador, TrabajadorForm } from '../../trabajador.model';


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

    @Input() trabajador?: Trabajador

    @Output() submitEvent = new EventEmitter<TrabajadorForm>()
    @Output() cancelEvent = new EventEmitter()
    
    fb = inject(FormBuilder);
    trabajadorService = inject(TrabajadorService);

    tipoTrabajador$ = this.trabajadorService.getTipoDeTrabajadores();


    form = this.fb.group({
        rut_trab: this.fb.nonNullable.control<string>('', [Validators.required, Validators.pattern(/^(\d{1,2}(?:\.\d{1,3}){2}-[\dkK])$/)]),
        pri_nom_trab: this.fb.nonNullable.control<string>('', [Validators.required, Validators.maxLength(50)]),
        seg_nom_trab: this.fb.control<string>('', [Validators.maxLength(50)]),
        pri_ape_trab: this.fb.nonNullable.control<string>('', [Validators.required, Validators.maxLength(50)]),
        seg_ape_trab: this.fb.control<string>('', [Validators.maxLength(50)]),
        email: this.fb.control<string>('', [Validators.email]),
        comuna_id: this.fb.control<number | null>(null, [Validators.required]),
        celular: this.fb.control<number | null>(null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
        direccion: this.fb.nonNullable.control<string>('', [Validators.required, Validators.maxLength(255)]),
        tipo_trab: this.fb.control<number | null>(null, [Validators.required]),
    });

    ngOnInit(): void {
        if (this.trabajador) {
            this.form.patchValue({
                rut_trab: this.trabajador.rut_trab,
                pri_nom_trab: this.trabajador.pri_nom_trab,
                seg_nom_trab: this.trabajador.seg_nom_trab,
                pri_ape_trab: this.trabajador.pri_ape_trab,
                seg_ape_trab: this.trabajador.seg_ape_trab,
                comuna_id: this.trabajador.comuna.id,
                email: this.trabajador.email,
                celular: this.trabajador.celular,
                tipo_trab: this.trabajador.tipo_trab.id,
                direccion: this.trabajador.direccion,
            })
        }
    }

    handleSelectedComuna(comunaId: number | null) {
        this.form.patchValue({ comuna_id: comunaId })
    }

    submit() {
        if (this.form.invalid) return;

        const values = this.form.getRawValue();
        const trabajador: TrabajadorForm = {
            rut_trab: values.rut_trab,
            pri_nom_trab: values.pri_nom_trab,
            seg_nom_trab: values.seg_nom_trab,
            pri_ape_trab: values.pri_ape_trab,
            seg_ape_trab: values.seg_ape_trab,
            email: values.email,
            comuna_id: values.comuna_id!,
            celular: values.celular!,
            tipo_trab_id: values.tipo_trab!,
            direccion: values.direccion,
            id: this.trabajador?.id
        }
        this.submitEvent.emit(trabajador)
    }

    cancelar() {
        this.cancelEvent.emit()
    }
}
