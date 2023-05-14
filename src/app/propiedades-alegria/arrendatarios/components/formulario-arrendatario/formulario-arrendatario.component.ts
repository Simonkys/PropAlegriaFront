import { Component, Input, OnInit, inject, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Arrendatario, ArrendatarioForm } from '../../arrendatario.model';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-formulario-arrendatario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, KeyFilterModule, ButtonModule, SelectButtonModule, InputNumberModule],
  templateUrl: './formulario-arrendatario.component.html',
  styleUrls: ['./formulario-arrendatario.component.scss']
})
export class FormularioArrendatarioComponent implements OnInit {
  
  @Input() arrendatario?: Arrendatario

  @Output() submitEvent = new EventEmitter<ArrendatarioForm>()
  @Output() cancelEvent = new EventEmitter<void>()

  opcionesEstadoArrendatario: {label: string; value: boolean}[] = [
    { label: 'Activo', value: true },
    {label: 'Inactivo', value: false }
  ]

  fb = inject(FormBuilder)

  form = this.fb.group({
    rut_arr:  this.fb.control<string>('', [Validators.required, Validators.pattern(/^(\d{1,2}(?:\.\d{1,3}){2}-[\dkK])$/),]),
    pri_nom_arr:  this.fb.control<string>('', [Validators.required, Validators.maxLength(50)]),
    seg_nom_arr:  this.fb.control<string | null>(null, [Validators.maxLength(50)]),
    pri_ape_arr:  this.fb.control('', [Validators.required, Validators.maxLength(50)]),
    seg_ape_arr:  this.fb.control<string | null>(null, [Validators.maxLength(50)]),
    contacto_arr:  this.fb.control<string | null>(null, [Validators.required]),
    correo_arr:  this.fb.control('', [Validators.required, Validators.email]),
    estado:  this.fb.control<boolean>(true, [Validators.required]),
    saldo:  this.fb.control<number>(0, [Validators.required, Validators.min(0), Validators.max(999999999)]),
  })


  ngOnInit() {
    if(this.arrendatario) {
      this.form.patchValue({
        rut_arr: this.arrendatario.rut_arr,
        pri_nom_arr: this.arrendatario.pri_nom_arr,
        seg_nom_arr: this.arrendatario.seg_nom_arr,
        pri_ape_arr: this.arrendatario.pri_ape_arr,
        seg_ape_arr: this.arrendatario.seg_ape_arr,
        contacto_arr: this.arrendatario.contacto_arr,
        correo_arr: this.arrendatario.correo_arr,
        estado: this.arrendatario.estado,
        saldo: this.arrendatario.saldo,
      })
    }
  }


  submit() {
    if(this.form.invalid) return;

    const values = this.form.getRawValue();

    const arrendatarioForm: ArrendatarioForm = {
      rut_arr: values.rut_arr!,
      pri_nom_arr: values.pri_nom_arr!,
      seg_nom_arr: values.seg_nom_arr,
      pri_ape_arr: values.pri_ape_arr!,
      seg_ape_arr: values.seg_ape_arr,
      contacto_arr: values.contacto_arr!,
      correo_arr: values.correo_arr!,
      estado: values.estado!,
      saldo: values.saldo!,
      id: this.arrendatario?.id
    }

    this.submitEvent.emit(arrendatarioForm)

  }

  cancel(){ 
    this.cancelEvent.emit();
  }

}
