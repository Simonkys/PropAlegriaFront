import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { ServiciosExtra } from '../../servicios-extra.model';

@Component({
  selector: 'app-detalle-servicio-extra',
  standalone: true,
  imports: [CommonModule, ButtonModule, ConfirmPopupModule],
  templateUrl: './detalle-servicio-extra.component.html',
  styleUrls: ['./detalle-servicio-extra.component.scss']
})
export class DetalleServicioExtraComponent {

  @Input() servicioExtra?: ServiciosExtra

  @Output() eliminarEvent = new EventEmitter();
  @Output() actualizarEvent = new EventEmitter();

  confimService = inject(ConfirmationService)

  eliminar(event: Event) {
    this.confimService.confirm({
      target: event.target || new EventTarget(),
      message: `¿Estas segur@ de eliminar este Servicio Extra?`,
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
