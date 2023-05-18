import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropiedadesService } from '../../propiedades/propiedades.service';
import { DropdownModule } from 'primeng/dropdown';

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

  @Output() selectedEvent = new EventEmitter<number>();



  selected(propiedadId: number) {
      this.selectedEvent.emit(propiedadId)
  }

}
