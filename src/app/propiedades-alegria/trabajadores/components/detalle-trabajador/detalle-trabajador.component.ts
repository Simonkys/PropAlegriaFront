import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';

import { Trabajador } from '../../trabajador.model';

@Component({
  selector: 'app-detalle-trabajador',
  standalone: true,
  providers: [ConfirmationService],
  imports: [CommonModule, ButtonModule, ConfirmPopupModule],
  templateUrl: './detalle-trabajador.component.html',
  styleUrls: ['./detalle-trabajador.component.scss']
})
export class DetalleTrabajadorComponent {

  @Input() trabajador?: Trabajador

  @Output() eliminarEvent = new EventEmitter()
  @Output() actualizarEvent = new EventEmitter()

  confimService = inject(ConfirmationService);


  eliminar(event: Event){
    this.confimService.confirm({
      target: event.target || new EventTarget(),
      message: `¿Estas segur@ de eliminar al trabajador?`,
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
