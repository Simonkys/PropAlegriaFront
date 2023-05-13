import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuentaBancaria } from '../../core/models/cuenta-bancaria.models';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CuentaBancariaService } from '../../core/services/cuenta-bancaria.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-listado-cuenta-bancaria',
  standalone: true,
  providers: [ConfirmationService],
  imports: [CommonModule, ConfirmPopupModule, ButtonModule, TableModule],
  templateUrl: './listado-cuenta-bancaria.component.html',
  styleUrls: ['./listado-cuenta-bancaria.component.scss']
})
export class ListadoCuentaBancariaComponent {
  @Input() cuentasBancarias: CuentaBancaria[] = [];
  @Output() eliminarEvent = new EventEmitter<number>();
  
  cuentaBancariaService = inject(CuentaBancariaService);
  confimService = inject(ConfirmationService);

  eliminarCuentaBancaria(event: Event, cuenta: CuentaBancaria) {
    this.confimService.confirm({
      target: event.target || new EventTarget(),
      message: `¿Estas segur@ de eliminar la cuenta`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cuentaBancariaService.eliminarCuentaBancaria(cuenta)
          .pipe()
          .subscribe({
            next: () => {
              this.eliminarEvent.emit(cuenta.id);
            },
            error: (err) => {}
          })
      },
    });
  }
}
