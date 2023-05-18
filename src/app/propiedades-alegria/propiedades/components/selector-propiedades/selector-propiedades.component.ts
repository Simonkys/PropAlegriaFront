import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropiedadesService } from '../../propiedades.service';
import { DropdownModule } from 'primeng/dropdown';
import { Propiedad } from '../../propiedad.model';

@Component({
  selector: 'app-selector-propiedades',
  standalone: true,
  imports: [CommonModule, DropdownModule],
  templateUrl: './selector-propiedades.component.html',
  styleUrls: ['./selector-propiedades.component.scss']
})
export class SelectorPropiedadesComponent {

  propiedadService = inject(PropiedadesService)

  propiedades$ = this.propiedadService.getPropiedades()

  @Output() selectedEvent = new EventEmitter<Propiedad>();



  selected(propiedad: Propiedad) {
      this.selectedEvent.emit(propiedad)
  }

}
