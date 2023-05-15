import { Component, Input, Output, inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Arrendatario } from '../../arrendatario.model';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-detalle-arrendatario',
  standalone: true,
  providers: [ConfirmationService],
  imports: [CommonModule, ButtonModule, ConfirmPopupModule, TagModule],
  templateUrl: './detalle-arrendatario.component.html',
  styleUrls: ['./detalle-arrendatario.component.scss']
})
export class DetalleArrendatarioComponent {

  @Input() arrendatario?: Arrendatario;

  @Output() actualizarEvent = new EventEmitter();
  @Output() eliminarEvent = new EventEmitter();

  confimService = inject(ConfirmationService);

  eliminar(event: Event) {
    this.confimService.confirm({
      target: event.target || new EventTarget(),
      message: `¿Estas segur@ de eliminar al arrendatario`,
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
