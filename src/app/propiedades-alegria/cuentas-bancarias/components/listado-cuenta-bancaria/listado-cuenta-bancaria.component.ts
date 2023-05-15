import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuentaBancaria } from '../../cuenta-bancaria.models';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CuentaBancariaService } from '../../cuenta-bancaria.service';

@Component({
  selector: 'app-listado-cuenta-bancaria',
  standalone: true,
  providers: [ConfirmationService],
  imports: [CommonModule, ConfirmPopupModule, ButtonModule, TableModule],
  templateUrl: './listado-cuenta-bancaria.component.html',
  styleUrls: ['./listado-cuenta-bancaria.component.scss']
})
export class ListadoCuentaBancariaComponent {
 
  @Output() registroEvent = new EventEmitter<void>();
  @Output() eliminarEvent = new EventEmitter<CuentaBancaria>();
  
  confimService = inject(ConfirmationService);
  cuentasBancariasService = inject(CuentaBancariaService)
  
  cuentas$ = this.cuentasBancariasService.cuentasBancarias$;

  eliminar(event: Event, cuenta: CuentaBancaria) {
    this.confimService.confirm({
      target: event.target || new EventTarget(),
      message: `¿Estas segur@ de eliminar la cuenta`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eliminarEvent.emit(cuenta);
      },
    });
  }


  registro() {
    this.registroEvent.emit();
  }
}
