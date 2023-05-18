import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';

import { Propiedad } from '../../propiedad.model';
import { TipoPropiedadEnum } from 'src/app/propiedades-alegria/core/models/tipo-propiedad.model';

@Component({
  selector: 'app-detalle-propiedad',
  standalone: true,
  providers: [ConfirmationService],
  imports: [CommonModule, ButtonModule, ConfirmPopupModule],
  templateUrl: './detalle-propiedad.component.html',
  styleUrls: ['./detalle-propiedad.component.scss']
})
export class DetallePropiedadComponent {

  @Input() propiedad?: Propiedad;

  @Input() mostrarEliminar: boolean = true
  @Input() mostrarActualizar: boolean = true
  @Input() mostrarLinkPropietario: boolean = true
  @Input() ocultarAcciones: boolean = false

  @Output() eliminarEvent = new EventEmitter();
  @Output() actualizarEvent = new EventEmitter();
  @Output() detallePropietarioEvent = new EventEmitter();
  
  confimService = inject(ConfirmationService);

  TipoPropiedadEnum = TipoPropiedadEnum

  eliminar(event: Event){
    this.confimService.confirm({
      target: event.target || new EventTarget(),
      message: `¿Estas segur@ de eliminar la propiedad`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eliminarEvent.emit()
      },
    });
  }


  actualizar() {
    this.actualizarEvent.emit()
  }

  detallePropietario() {
    this.detallePropietarioEvent.emit()
  }

}
