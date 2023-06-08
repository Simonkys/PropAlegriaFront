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

import { ExternoService } from 'src/app/propiedades-alegria/externos/externo.service';
import { UbicacionFormComponent } from '../../../componentes/ubicacion-form/ubicacion-form.component';
import { Externo, ExternoForm } from '../../externo.model';

@Component({
  selector: 'app-externo-form',
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
  templateUrl: './externo-form.component.html',
  styleUrls: ['./externo-form.component.scss']
})
export class ExternoFormComponent implements OnInit {

  @Input() externo?: Externo

  @Output() submitEvent = new EventEmitter<ExternoForm>()
  @Output() cancelEvent = new EventEmitter()
  
  fb = inject(FormBuilder);
  externoService = inject(ExternoService);

  form = this.fb.group({
    nombre: this.fb.nonNullable.control<string>('', [Validators.required, Validators.maxLength(50)]),
    rut: this.fb.control<string>('', [Validators.required, Validators.pattern(/^(\d{1,2}(?:\.\d{1,3}){2}-[\dkK])$/)]),
    correo: this.fb.nonNullable.control<string>('', [Validators.email]),
    contacto: this.fb.nonNullable.control<number>(0, [Validators.required, Validators.minLength(9), Validators.maxLength(15)]),
    rol: this.fb.nonNullable.control<string>('', [Validators.required, Validators.maxLength(50)]),
  });

  ngOnInit(): void {
    if (this.externo) {
      this.form.patchValue({
        nombre: this.externo.nombre,
        rut: this.externo.rut,
        correo: this.externo.correo,
        contacto: this.externo.contacto,
        rol: this.externo.rol,
      })
    }
  }

  submit() {
    if (this.form.invalid) return;

    const values = this.form.getRawValue();
    const externo: ExternoForm = {
      id: this.externo?.id,
      nombre: values.nombre,
      rut: values.rut!,
      correo: values.correo,
      contacto: values.contacto,
      rol: values.rol,
    }
    this.submitEvent.emit(externo)
  }

  cancelar() {
    this.cancelEvent.emit()
  }

}
