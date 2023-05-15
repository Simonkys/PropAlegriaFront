import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BancoService } from '../../banco.service';
import {  CuentaBancariaForm } from '../../cuenta-bancaria.models';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-formulario-cuenta-bancaria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, DropdownModule, KeyFilterModule, InputTextModule],
  templateUrl: './formulario-cuenta-bancaria.component.html',
  styleUrls: ['./formulario-cuenta-bancaria.component.scss']
})
export class FormularioCuentaBancariaComponent implements OnInit {

  @Input() rut_propietario!: string;
  @Output() submitEvent = new EventEmitter<CuentaBancariaForm>();
  @Output() cancelEvent = new EventEmitter<void>();

  fb = inject(FormBuilder)
  bancoService = inject(BancoService)

  tipoCuentasBanco$ = this.bancoService.getTipoCuentasBanco();
  bancos$ = this.bancoService.getBancos()

  form = this.fb.group({
    cuenta: this.fb.control<number | null>(null, [Validators.required, Validators.maxLength(16)]),
    estado_cuenta: this.fb.control<string>({value: 'Primaria', disabled: true}, [Validators.required, Validators.maxLength(100)]),
    propietario_rut: this.fb.control<string>('', [Validators.required]),
    banco_id: this.fb.control<number | null>(null, [Validators.required]),
    tipo_cuenta_id: this.fb.control<number | null>(null, [Validators.required])
  })



  ngOnInit() {
    this.form.patchValue({ propietario_rut: this.rut_propietario })
  }

  submit() {
    if (this.form.invalid) return;

    const form = this.form.getRawValue()

    const cuentaBancariaForm: CuentaBancariaForm = {
      cuenta: form.cuenta!,
      estado_cuenta: form.estado_cuenta!,
      propietario_rut: form.propietario_rut!,
      banco_id: form.banco_id!,
      tipocuenta_id: form.tipo_cuenta_id!
    }

    this.submitEvent.emit(cuentaBancariaForm)
  }

  cancel() {
    this.form.reset();
    this.cancelEvent.emit();
  }
}
