import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Arriendo } from '../../arriendo.model';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-detalle-arriendo',
  standalone: true,
  providers: [ConfirmationService],
  imports: [CommonModule, ButtonModule, ConfirmPopupModule, TagModule],
  templateUrl: './detalle-arriendo.component.html',
  styleUrls: ['./detalle-arriendo.component.scss']
})
export class DetalleArriendoComponent {

  @Input() arriendo?: Arriendo

  @Output() eliminarEvent = new EventEmitter();
  @Output() actualizarEvent = new EventEmitter();

  confimService = inject(ConfirmationService)


  eliminar(event: Event) {
    this.confimService.confirm({
      target: event.target || new EventTarget(),
      message: `¿Estas segur@ de eliminar el arriendo`,
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
