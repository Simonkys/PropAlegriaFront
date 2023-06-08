import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DetalleArriendo } from '../../core/models/detalle-arriendo.model';
import { DetalleArriendoService } from '../../core/services/detalle-arriendo.service';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-registrar-pago-arriendo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CalendarModule, InputTextModule, KeyFilterModule, ButtonModule, InputNumberModule],
  templateUrl: './registrar-pago-arriendo-form.component.html',
  styleUrls: ['./registrar-pago-arriendo-form.component.scss']
})
export class RegistrarPagoArriendoFormComponent implements OnInit{
  
  router = inject(Router)
  location = inject(Location)
  
  detalleArriendoService = inject(DetalleArriendoService)


  registroPago?: DetalleArriendo

  fb = inject(FormBuilder)

  form = this.fb.group({
    fecha_pagada: this.fb.control<Date | null>(null, [Validators.required]),
    monto_pagado: this.fb.control<number | null>(null, [Validators.required, Validators.min(0), Validators.max(99999999)])
  })


  ngOnInit(): void {
    const state: any = this.location.getState();
    this.registroPago = state['registroPago'];

    if(this.registroPago) {
      this.form.patchValue({
        monto_pagado: this.registroPago.monto_pagado,
        fecha_pagada: this.registroPago.fecha_pagada ? new Date( this.registroPago.fecha_pagada) : null
      })
    } else {
      this.location.back()
    }

  }


  registrar() {
    if (this.form.invalid) return;

    const values = this.form.getRawValue();

    if(this.registroPago) {
      this.detalleArriendoService.registrarDetalleArriendo({ 
        ...this.registroPago, 
        fecha_pagada: values.fecha_pagada, 
        monto_pagado: values.monto_pagado
      }).subscribe(response => {
        this.location.back()
      })
    }
    
  }


  cancelar() {
    this.location.back();
  }

}
