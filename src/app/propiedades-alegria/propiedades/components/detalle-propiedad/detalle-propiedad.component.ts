import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';

import { Propiedad } from '../../propiedad.model';
import { TipoPropiedadEnum } from 'src/app/propiedades-alegria/core/models/tipo-propiedad.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalle-propiedad',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink],
  templateUrl: './detalle-propiedad.component.html',
  styleUrls: ['./detalle-propiedad.component.scss']
})
export class DetallePropiedadComponent {

  @Input() propiedad?: Propiedad;

  @Output() detallePropietarioEvent = new EventEmitter();

  TipoPropiedadEnum = TipoPropiedadEnum

  detallePropietario() {
    this.detallePropietarioEvent.emit()
  }

}
