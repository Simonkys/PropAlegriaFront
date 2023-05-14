import { Component, Input, Output, inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Arrendatario } from '../../arrendatario.model';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-detalle-arrendatario',
  standalone: true,
  providers: [ConfirmationService],
  imports: [CommonModule, ButtonModule, RouterLink, ConfirmPopupModule, TagModule],
  templateUrl: './detalle-arrendatario.component.html',
  styleUrls: ['./detalle-arrendatario.component.scss']
})
export class DetalleArrendatarioComponent {

  @Input() arrendatario?: Arrendatario;
  @Output() eliminarEvent = new EventEmitter<Arrendatario>();

  confimService = inject(ConfirmationService);


  eliminar(event: Event, arrendatario: Arrendatario) {
    this.confimService.confirm({
      target: event.target || new EventTarget(),
      message: `¿Estas segur@ de eliminar al arrendatario`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eliminarEvent.emit(arrendatario);
      },
    });
  } 
}
