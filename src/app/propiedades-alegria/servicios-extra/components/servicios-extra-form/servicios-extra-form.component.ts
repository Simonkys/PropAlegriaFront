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

import { ServiciosExtraService } from '../../servicios-extra.service';
import { ServiciosExtra, ServiciosExtraForm } from '../../servicios-extra.model';

@Component({
  selector: 'app-servicios-extra-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    TooltipModule,
    KeyFilterModule,
  ],
  templateUrl: './servicios-extra-form.component.html',
  styleUrls: ['./servicios-extra-form.component.scss']
})
export class ServiciosExtraFormComponent implements OnInit {

  @Input() servicioExtra?: ServiciosExtra

  @Output() submitEvent = new EventEmitter<ServiciosExtraForm>()
  @Output() cancelEvent = new EventEmitter()
  
  fb = inject(FormBuilder);
  serviciosExtraService = inject(ServiciosExtraService);

  form = this.fb.group({
    propiedad: this.fb.control<number | null>(null, [Validators.required]),
    nom_servicio: this.fb.nonNullable.control<string>('', [Validators.required, Validators.maxLength(150)]),
    descripcion: this.fb.nonNullable.control<string>('', [Validators.required, Validators.maxLength(250)]),
    fecha: this.fb.control<Date>(new Date(), [Validators.required]),
    monto: this.fb.nonNullable.control<number>(0, [Validators.required]),
    nro_cuotas: this.fb.nonNullable.control<number>(1, [Validators.required]),
    monto_cuotas: this.fb.nonNullable.control<number>(0, [Validators.required]),
    contador_cuotas: this.fb.nonNullable.control<number>(0, [Validators.required]),
  });

  ngOnInit(): void {
    if (this.servicioExtra) {
      this.form.patchValue({
        propiedad: this.servicioExtra.propiedad,
        nom_servicio: this.servicioExtra.nom_servicio,
        descripcion: this.servicioExtra.descripcion,
        fecha: this.servicioExtra.fecha,
        monto: this.servicioExtra.monto,
        nro_cuotas: this.servicioExtra.nro_cuotas,
        monto_cuotas: this.servicioExtra.monto_cuotas,
        contador_cuotas: this.servicioExtra.contador_cuotas,
      })
    }
  }

  submit() {
    if (this.form.invalid) return;

    const values = this.form.getRawValue();
    const serviciosExtraForm: ServiciosExtraForm = {
      id: this.servicioExtra?.id,
      propiedad: values.propiedad,
      nom_servicio: values.nom_servicio,
      descripcion: values.descripcion,
      fecha: values.fecha,
      monto: values.monto,
      nro_cuotas: values.nro_cuotas,
      monto_cuotas: values.monto_cuotas,
      contador_cuotas: values.contador_cuotas,
    }
    this.submitEvent.emit(serviciosExtraForm)
  }

  cancelar() {
    this.cancelEvent.emit()
  }

}
