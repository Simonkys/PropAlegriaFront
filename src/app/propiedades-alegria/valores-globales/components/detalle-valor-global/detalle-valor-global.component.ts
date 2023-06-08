import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';

import { ValoresGlobales } from '../../valores-globales.model';
import { ValoresGlobalesService } from '../../valores-globales.service'

@Component({
  selector: 'app-detalle-valor-global',
  standalone: true,
  providers: [ConfirmationService],
  imports: [CommonModule, ButtonModule, ConfirmPopupModule],
  templateUrl: './detalle-valor-global.component.html',
  styleUrls: ['./detalle-valor-global.component.scss']
})
export class DetalleValorGlobalComponent {

  valoresGlobalesService = inject(ValoresGlobalesService);

  valoresGlobales = this.valoresGlobalesService.getValoresGlobales()

}
