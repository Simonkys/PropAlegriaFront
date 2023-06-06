import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';

import { Externo } from '../../externo.model';

@Component({
  selector: 'app-detalle-externo',
  standalone: true,
  providers: [ConfirmationService],
  imports: [CommonModule, ButtonModule, ConfirmPopupModule],
  templateUrl: './detalle-externo.component.html',
  styleUrls: ['./detalle-externo.component.scss']
})
export class DetalleExternoComponent {

  @Input() externo?: Externo

  @Output() eliminarEvent = new EventEmitter()
  @Output() actualizarEvent = new EventEmitter()

  confimService = inject(ConfirmationService);

  eliminar(event: Event){
    this.confimService.confirm({
      target: event.target || new EventTarget(),
      message: `¿Estas segur@ de eliminar al trabajador externo?`,
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
