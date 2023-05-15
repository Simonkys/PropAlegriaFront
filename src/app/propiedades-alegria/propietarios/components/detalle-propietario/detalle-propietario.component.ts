import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ButtonModule } from 'primeng/button';

import { Propietario } from '../../propietario.model';

@Component({
  selector: 'app-detalle-propietario',
  standalone: true,
  providers: [ConfirmationService],
  imports: [CommonModule, ButtonModule, ConfirmPopupModule],
  templateUrl: './detalle-propietario.component.html',
  styleUrls: ['./detalle-propietario.component.scss']
})
export class DetallePropietarioComponent {

  @Input() propietario?: Propietario

  @Output() eliminarEvent = new EventEmitter()
  @Output() actualizarEvent = new EventEmitter()

  confimService = inject(ConfirmationService);


  eliminar(event: Event){
    this.confimService.confirm({
      target: event.target || new EventTarget(),
      message: `¿Estas segur@ de eliminar el propietario?`,
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
