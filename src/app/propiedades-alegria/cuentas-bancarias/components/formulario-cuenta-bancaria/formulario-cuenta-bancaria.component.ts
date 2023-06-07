import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BancoService } from '../../banco.service';
import {  CuentaBancaria, CuentaBancariaForm } from '../../cuenta-bancaria.models';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CuentaBancariaService } from '../../cuenta-bancaria.service';


@Component({
  selector: 'app-formulario-cuenta-bancaria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, DropdownModule, KeyFilterModule, InputTextModule],
  templateUrl: './formulario-cuenta-bancaria.component.html',
  styleUrls: ['./formulario-cuenta-bancaria.component.scss']
})
export class FormularioCuentaBancariaComponent implements OnInit {

  @Input() rut_propietario!: string
  @Input() cuentaBancaria?: CuentaBancaria
  @Output() submitEvent = new EventEmitter<boolean>()
  @Output() cancelEvent = new EventEmitter()

  

  fb = inject(FormBuilder)
  bancoService = inject(BancoService)
  cuentasBancariasService = inject(CuentaBancariaService)


  tipoCuentasBanco$ = this.bancoService.getTipoCuentasBanco()
  bancos$ = this.bancoService.getBancos()

  form = this.fb.group({
    cuenta: this.fb.control<number | null>(null, [Validators.required, Validators.maxLength(16)]),
    estado_cuenta: this.fb.control<string>({value: 'Primaria', disabled: true}, [Validators.required, Validators.maxLength(100)]),
    propietario_rut: this.fb.control<string>('', [Validators.required]),
    banco_id: this.fb.control<number | null>(null, [Validators.required]),
    tipo_cuenta_id: this.fb.control<number | null>(null, [Validators.required]),
    rut_tercero: this.fb.control<string | null>(null, [Validators.pattern(/^(\d{1,2}(?:\.\d{1,3}){2}-[\dkK])$/),]),
  })



  ngOnInit() {
    if(this.cuentaBancaria) {
      this.form.patchValue({
        cuenta: this.cuentaBancaria.cuenta,
        estado_cuenta: this.cuentaBancaria.estado_cuenta,
        propietario_rut: this.cuentaBancaria.propietario_rut,
        banco_id: this.cuentaBancaria.banco.id,
        tipo_cuenta_id: this.cuentaBancaria.tipocuenta.id,
        rut_tercero: this.cuentaBancaria.rut_tercero,
      })
    } else {

      this.form.patchValue({ propietario_rut: this.rut_propietario })
    }

    this.form.controls['rut_tercero'].valueChanges.subscribe((rutTercero) => {
      if(!rutTercero || rutTercero === '') {
        this.form.controls['estado_cuenta'].patchValue('Primaria')
      } else {
        this.form.controls['estado_cuenta'].patchValue('Secundaria')
      }
    })
  }

  submit() {
    if (this.form.invalid) return;

    const form = this.form.getRawValue()

    const cuentaBancariaForm: CuentaBancariaForm = {
      cuenta: form.cuenta!,
      estado_cuenta: form.estado_cuenta!,
      propietario_rut: form.propietario_rut!,
      banco_id: form.banco_id!,
      tipocuenta_id: form.tipo_cuenta_id!,
      rut_tercero: !form.rut_tercero || form.rut_tercero === '' ? null : form.rut_tercero,
      id: this.cuentaBancaria?.id,
    }

    if (this.cuentaBancaria) {
      this.cuentasBancariasService.actualizarCuentaBancaria(cuentaBancariaForm).subscribe({
        next: () => { this.submitEvent.emit(true) },
        error: () => { this.submitEvent.emit(false)}
      })
    } else {
      this.cuentasBancariasService.registrarCuentaBancaria(cuentaBancariaForm).subscribe({
        next: () => { this.submitEvent.emit(true) },
        error: () => { this.submitEvent.emit(false)}
      })
    }
    
  }

  cancel() {
    this.form.reset();
    this.cancelEvent.emit();
  }
}
