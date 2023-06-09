import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ListadoServiciosExtraComponent } from '../../components/listado-servicios-extra/listado-servicios-extra.component';
import { ServiciosExtraService } from '../../servicios-extra.service';

@Component({
  selector: 'app-listado-servicios-extra-page',
  standalone: true,
  imports: [CommonModule, ListadoServiciosExtraComponent],
  templateUrl: './listado-servicios-extra-page.component.html',
  styleUrls: ['./listado-servicios-extra-page.component.scss']
})
export class ListadoServiciosExtraPageComponent {

  serviciosExtraService = inject(ServiciosExtraService)
  router = inject(Router)

  serviciosExtra$ = this.serviciosExtraService.getServiciosExtra()

  handleRegistrarEvent() {
    this.router.navigate(['servicios-extra', 'registro'])
  }

  handleDetailEvent(servicioExtraId: number) {
    this.router.navigate(['servicios-extra', servicioExtraId, 'detalle'])
  }

}
