import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ButtonModule } from 'primeng/button';

import { Propietario } from '../../propietario.model';

@Component({
  selector: 'app-detalle-propietario',
  standalone: true,
  imports: [CommonModule, ButtonModule, ConfirmPopupModule],
  templateUrl: './detalle-propietario.component.html',
  styleUrls: ['./detalle-propietario.component.scss']
})
export class DetallePropietarioComponent {

  @Input() propietario?: Propietario

}
