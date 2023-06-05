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
import { SelectorPropiedadesComponent } from 'src/app/propiedades-alegria/propiedades/components/selector-propiedades/selector-propiedades.component';
import { Arrendatario } from 'src/app/propiedades-alegria/arrendatarios/arrendatario.model';
import { ArrendatarioService } from 'src/app/propiedades-alegria/arrendatarios/arrendatario.service';
import { DetallePropiedadComponent } from 'src/app/propiedades-alegria/propiedades/components/detalle-propiedad/detalle-propiedad.component';
import { Propiedad } from 'src/app/propiedades-alegria/propiedades/propiedad.model';


@Component({
  selector: 'app-formulario-arriendo',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    ButtonModule, 
    InputTextModule, 
    KeyFilterModule, 
    CalendarModule, 
    DropdownModule, 
    InputNumberModule, 
    SelectButtonModule, 
    SelectorPropiedadesComponent,
    DetallePropiedadComponent
],
  templateUrl: './formulario-arriendo.component.html',
  styleUrls: ['./formulario-arriendo.component.scss']
})
export class FormularioArriendoComponent implements OnInit {

  @Input() arriendo?: Arriendo
  @Input() arrendatario?: Arrendatario

  @Output() cancelEvent = new EventEmitter()
  @Output() submitEvent = new EventEmitter<ArriendoForm>()

  fb = inject(FormBuilder)
  arrendatarioService = inject(ArrendatarioService)

  arrendatarios$ = this.arrendatarioService.getArrendatarios()
  propiedadSeleccionada?: Propiedad

  periodos_reajuste: number[] = [3, 6, 12]
  opcionesEstadoArriendo: {label: string; value: boolean}[] = [
    { label: 'Activo', value: true },
    { label: 'Inactivo', value: false }
  ]

  form = this.fb.group({
    cod_arriendo: this.fb.control<string | null>(null, [Validators.maxLength(50)]),

    fecha_inicio: this.fb.control<Date>(new Date(), [Validators.required]),
    fecha_termino: this.fb.control<Date>(new Date(), [Validators.required]),
    periodo_reajuste: this.fb.control<number | null>(3, [Validators.required, Validators.min(3), Validators.max(12)]),

    fecha_pri_ajuste: this.fb.control<Date | null>(null, [Validators.required]),

    monto_arriendo: this.fb.control<number | null>(0, [Validators.required, Validators.min(0), Validators.maxLength(16)]),

    estado_arriendo: this.fb.control<boolean>(true, [Validators.required]),
    porcentaje_multa: this.fb.control<number | null>(null, [Validators.required, Validators.min(0), Validators.max(100)]),
    
    arrendatario_id: this.fb.control<number | null>(null, [Validators.required]),
    propiedad_id: this.fb.control<number | null>(null, [Validators.required]),

    fecha_entrega: this.fb.control<Date | null>(null, []),
  })

  fechaTerminoMinDate: Date = new Date()


  ngOnInit(): void {
    if(this.arriendo) {
      this.form.patchValue({
        cod_arriendo: this.arriendo.propiedad?.numero_ppdd,
        fecha_inicio: this.arriendo.fecha_inicio,
        fecha_termino: this.arriendo.fecha_termino,
        fecha_pri_ajuste: this.arriendo.fecha_reajuste,
        periodo_reajuste: this.arriendo.periodo_reajuste,
        monto_arriendo: this.arriendo.valor_arriendo,
        fecha_entrega: this.arriendo.fecha_entrega,
        estado_arriendo: this.arriendo.estado_arriendo,
        arrendatario_id: this.arriendo.arrendatario.id,
        propiedad_id: this.arriendo.propiedad?.id,
      })
    } else {
      this.form.controls['fecha_entrega'].disable()
      this.form.controls['fecha_pri_ajuste'].disable()
      this.setFechaTermino(new Date())
      this.setFechaPriReajuste(this.form.controls['periodo_reajuste'].value!)
    }

    if(this.arrendatario) {
      this.form.patchValue({arrendatario_id: this.arrendatario.id})
      this.form.controls['arrendatario_id'].disable();
    }

    this.form.controls['fecha_inicio'].valueChanges.subscribe(value => {
      if(value) {
        this.setFechaTermino(value)
      }
    })

    this.form.controls['periodo_reajuste'].valueChanges.subscribe(periodoMesesReajuste => {
      if(periodoMesesReajuste) {
        this.setFechaPriReajuste(periodoMesesReajuste)
      }
    })
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

  handlePropiedadSelectedEvent(propiedad: Propiedad) {
    this.propiedadSeleccionada = propiedad
    this.form.patchValue({propiedad_id: propiedad.id})
  }

  setFechaPriReajuste(periodoMesesReajuste: number) {
    this.form.controls['fecha_pri_ajuste'].patchValue(
      this.addMonths(this.form.controls['fecha_inicio'].value!, periodoMesesReajuste)
    )
  }

  setFechaTermino(date: Date) {
    const fechaTermino = this.addMonths(date, 12)
    this.fechaTerminoMinDate = fechaTermino
    this.form.controls['fecha_termino'].patchValue(fechaTermino)
  }

  addMonths(date: Date, months: number) {
    const dateCopy = new Date(date);
    dateCopy.setMonth(dateCopy.getMonth() + months);
    return dateCopy;
  }
}
