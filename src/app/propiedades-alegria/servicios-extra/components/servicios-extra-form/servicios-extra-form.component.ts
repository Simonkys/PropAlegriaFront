import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';

import { ServiciosExtraService } from '../../servicios-extra.service';
import { ServiciosExtra, ServiciosExtraForm } from '../../servicios-extra.model';
import { DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-servicios-extra-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    KeyFilterModule,
    CalendarModule,
    DynamicDialogModule
  ],
  templateUrl: './servicios-extra-form.component.html',
  styleUrls: ['./servicios-extra-form.component.scss']
})
export class ServiciosExtraFormComponent implements OnInit {

  fb = inject(FormBuilder);
  serviciosExtraService = inject(ServiciosExtraService);

  servicioExtra?: ServiciosExtra
  propiedadId?: number


  constructor(public ref: DynamicDialogRef, private conf: DynamicDialogConfig<any>) {}
  
  

  form = this.fb.group({
    propiedad: this.fb.nonNullable.control<number | null>(null, [Validators.required]),
    nom_servicio: this.fb.nonNullable.control<string>('', [Validators.required, Validators.maxLength(150)]),
    descripcion: this.fb.nonNullable.control<string>('', [Validators.required, Validators.maxLength(250)]),
    fecha: this.fb.control<Date>(new Date(), [Validators.required]),
    monto: this.fb.nonNullable.control<number>(0, [Validators.required, Validators.min(0), Validators.max(999999999)]),
    nro_cuotas: this.fb.nonNullable.control<number>(1, [Validators.required, Validators.min(1), Validators.max(99)]),
    contador_cuotas: this.fb.nonNullable.control<number>(0, [Validators.required, Validators.min(0)])
  });

  ngOnInit(): void {
    this.servicioExtra = this.conf.data.servicioExtra;
    this.propiedadId = this.conf.data.propiedadId;
    
    if (this.servicioExtra) {
      this.form.patchValue({
        propiedad: this.servicioExtra.propiedad,
        nom_servicio: this.servicioExtra.nom_servicio,
        descripcion: this.servicioExtra.descripcion,
        fecha: this.servicioExtra.fecha,
        monto: this.servicioExtra.monto,
        nro_cuotas: this.servicioExtra.nro_cuotas,
        contador_cuotas: this.servicioExtra.contador_cuotas
      })

      this.setcontadorCuotasMaxValue(this.servicioExtra.nro_cuotas)

    } else {
      this.form.patchValue({ propiedad: this.propiedadId })
    }

    this.form.get('nro_cuotas')?.valueChanges.subscribe((value) => {
      if(value) {
        console.log(value)
        this.setcontadorCuotasMaxValue(value)
      }
    })
  }

  setcontadorCuotasMaxValue(value: number) {
    const control = this.form.get('contador_cuotas')
    control?.setValidators([Validators.required, Validators.min(0), Validators.max(value)])
    control?.updateValueAndValidity()
  }

  submit() {
    if (this.form.invalid) return;

    const values = this.form.getRawValue();
    const serviciosExtraForm: ServiciosExtraForm = {
      propiedad: values.propiedad!,
      contador_cuotas: values.contador_cuotas,
      nom_servicio: values.nom_servicio,
      descripcion: values.descripcion,
      fecha: values.fecha,
      monto: values.monto,
      nro_cuotas: values.nro_cuotas,
    }
    this.ref.close(serviciosExtraForm)
  }

  cancelar() {
    this.ref.close()
  }

}
