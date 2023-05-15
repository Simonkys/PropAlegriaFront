import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';

import { Arriendo, ArriendoForm } from '../../arriendo.model';


@Component({
  selector: 'app-formulario-arriendo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, KeyFilterModule, CalendarModule, DropdownModule, InputNumberModule, SelectButtonModule],
  templateUrl: './formulario-arriendo.component.html',
  styleUrls: ['./formulario-arriendo.component.scss']
})
export class FormularioArriendoComponent implements OnInit {

  @Input() arriendo?: Arriendo;


  @Output() cancelEvent = new EventEmitter()
  @Output() submitEvent = new EventEmitter<ArriendoForm>()

  fb = inject(FormBuilder)

  periodos_reajuste: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  opcionesEstadoArriendo: {label: string; value: boolean}[] = [
    { label: 'Activo', value: true },
    { label: 'Inactivo', value: false }
  ]

  form = this.fb.group({
    cod_arriendo: this.fb.control<string | null>(null, [Validators.maxLength(50)]),

    fecha_inicio: this.fb.control<Date>(new Date(), [Validators.required]),
    fecha_termino: this.fb.control<Date>(new Date(), [Validators.required]),
    fecha_pri_ajuste: this.fb.control<Date | null>(null, [Validators.required]),

    periodo_reajuste: this.fb.control<number | null>(1, [Validators.required, Validators.min(1), Validators.max(12)]),
    monto_arriendo: this.fb.control<number | null>(null, [Validators.required, Validators.min(0), Validators.maxLength(16)]),

    fecha_entrega: this.fb.control<Date | null>(null, []),
    estado_arriendo: this.fb.control<boolean>(true, [Validators.required]),
    porcentaje_multa: this.fb.control<number | null>(null, [Validators.required, Validators.min(0), Validators.max(100)]),

    arrendatario_id: this.fb.control<number | null>(1, [Validators.required]),
    propiedad_id: this.fb.control<number | null>(1, []),
  })


  ngOnInit(): void {
    if(this.arriendo) {
      this.form.patchValue({
        cod_arriendo: this.arriendo.cod_arriendo,
        fecha_inicio: this.arriendo.fecha_inicio,
        fecha_termino: this.arriendo.fecha_termino,
        fecha_pri_ajuste: this.arriendo.fecha_pri_ajuste,
        periodo_reajuste: this.arriendo.periodo_reajuste,
        monto_arriendo: this.arriendo.monto_arriendo,
        fecha_entrega: this.arriendo.fecha_entrega,
        estado_arriendo: this.arriendo.estado_arriendo,
        porcentaje_multa: this.arriendo.porcentaje_multa,
        arrendatario_id: this.arriendo.arrendatario.id,
        propiedad_id: this.arriendo.propiedad?.id,
      })
    }
  }


  submit() {
    if(this.form.invalid) return

    const values = this.form.getRawValue();

    const arriendoForm: ArriendoForm = {
        cod_arriendo: values.cod_arriendo,
        fecha_inicio: values.fecha_inicio!,
        fecha_termino: values.fecha_termino!,
        fecha_pri_ajuste: values.fecha_pri_ajuste!,
        periodo_reajuste: values.periodo_reajuste!,
        monto_arriendo: values.monto_arriendo!,
        fecha_entrega: values.fecha_entrega,
        estado_arriendo: values.estado_arriendo!,
        porcentaje_multa: values.porcentaje_multa!,
        arrendatario_id: values.arrendatario_id!,
        propiedad_id: values.propiedad_id,
    }

    this.submitEvent.emit(arriendoForm)
  }


  cancel() {
    this.cancelEvent.emit()
  }
}
