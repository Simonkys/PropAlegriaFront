import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Propietario, PropietarioForm } from '../../propietario.model';
import { KeyFilterModule } from 'primeng/keyfilter';
import { UbicacionFormComponent } from '../../../componentes/ubicacion-form/ubicacion-form.component';

@Component({
  selector: 'app-formulario-propietario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UbicacionFormComponent,
    InputTextModule,
    ButtonModule,
    KeyFilterModule
  ],
  templateUrl: './formulario-propietario.component.html',
  styleUrls: ['./formulario-propietario.component.scss']
})
export class FormularioPropietarioComponent implements OnInit {

  @Input() propietario?: Propietario

  @Output() submitEvent = new EventEmitter<PropietarioForm>();
  @Output() cancelEvent = new EventEmitter<void>();

  fb = inject(FormBuilder)
  

  form = this.fb.group({
    rut_prop: this.fb.nonNullable.control<string>('',
      [
        Validators.required,
        Validators.pattern(/^(\d{1,2}(?:\.\d{1,3}){2}-[\dkK])$/),
      ],
    ),

    pri_nom_prop: this.fb.nonNullable.control<string>('', [Validators.required, Validators.maxLength(50)]),
    seg_nom_prop: this.fb.control<string | null>(null, [Validators.maxLength(50)]),
    pri_ape_prop: this.fb.nonNullable.control<string>('', [Validators.required, Validators.maxLength(50)]),
    seg_ape_prop: this.fb.control<string | null>(null, [Validators.maxLength(50)]),

    direccion_prop: this.fb.nonNullable.control<string>('', [Validators.required, Validators.maxLength(200)]),
    email_prop: this.fb.control<string>('', [Validators.required, Validators.email]),
    contacto_prop: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15),
    ],),
    comuna_id: this.fb.control<number | null>(null, [Validators.required]),
  })

  ngOnInit(): void {
    if(this.propietario) {
      this.form.patchValue({
        rut_prop: this.propietario.rut_prop,
        pri_nom_prop: this.propietario.pri_nom_prop,
        seg_nom_prop: this.propietario.seg_nom_prop,
        pri_ape_prop: this.propietario.pri_ape_prop,
        seg_ape_prop: this.propietario.seg_ape_prop,
        direccion_prop: this.propietario.direccion_prop,
        email_prop: this.propietario.email_prop,
        contacto_prop: this.propietario.contacto_prop,
        comuna_id: this.propietario.comuna.id
      })
    }
  }

  handleSelectedComuna(comunaId: number | null) {
    this.form.patchValue({ comuna_id: comunaId })
  }


  submit() {
    if(this.form.invalid) return;

    const values = this.form.getRawValue();
    const propietarioForm: PropietarioForm = {
      rut_prop: values.rut_prop,
      pri_nom_prop: values.pri_nom_prop,
      seg_nom_prop: values.seg_nom_prop,
      pri_ape_prop: values.pri_ape_prop,
      seg_ape_prop: values.seg_ape_prop,
      direccion_prop: values.direccion_prop,
      email_prop: values.email_prop!,
      contacto_prop: values.contacto_prop!,
      comuna_id: values.comuna_id!,
      id: this.propietario?.id
    }

    this.submitEvent.emit(propietarioForm);
  }

  cancelar() {
    this.cancelEvent.emit();
  }

}
