import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropietarioService } from '../../propietario.service';
import { Propietario } from '../../propietario.model';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-selector-propietarios',
  standalone: true,
  imports: [CommonModule, DropdownModule],
  templateUrl: './selector-propietarios.component.html',
  styleUrls: ['./selector-propietarios.component.scss']
})
export class SelectorPropietariosComponent {

  propietarioService = inject(PropietarioService);

  propietarios$ = this.propietarioService.getPropietarios();

  @Output() selectedEvent = new EventEmitter<Propietario>();

  selected(propietario: Propietario) {
    this.selectedEvent.emit(propietario);
  }
}
