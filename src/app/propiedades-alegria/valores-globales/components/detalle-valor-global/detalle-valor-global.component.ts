import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';

import { ValoresGlobales } from '../../valores-globales.model';

@Component({
  selector: 'app-detalle-valor-global',
  standalone: true,
  providers: [ConfirmationService],
  imports: [CommonModule, ButtonModule, ConfirmPopupModule],
  templateUrl: './detalle-valor-global.component.html',
  styleUrls: ['./detalle-valor-global.component.scss']
})
export class DetalleValorGlobalComponent {

  @Input() valoresGlobales?: ValoresGlobales

  @Output() eliminarEvent = new EventEmitter()
  @Output() actualizarEvent = new EventEmitter()

  confimService = inject(ConfirmationService);

  eliminar(event: Event){
    this.confimService.confirm({
      target: event.target || new EventTarget(),
      message: `¿Estas segur@ de eliminar este Valor Global?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eliminarEvent.emit()
      },
    });
  }

  actualizar() {
    this.actualizarEvent.emit()
  }

}
