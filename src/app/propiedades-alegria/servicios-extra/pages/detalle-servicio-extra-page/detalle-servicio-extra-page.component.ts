import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { map, switchMap } from 'rxjs';

import { ServiciosExtraService } from '../../servicios-extra.service';
import { DetalleServicioExtraComponent } from '../../components/detalle-servicio-extra/detalle-servicio-extra.component';
import { ServiciosExtra } from '../../servicios-extra.model';


@Component({
  selector: 'app-detalle-servicio-extra-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, DetalleServicioExtraComponent],
  templateUrl: './detalle-servicio-extra-page.component.html',
  styleUrls: ['./detalle-servicio-extra-page.component.scss']
})
export class DetalleServicioExtraPageComponent {

  route = inject(ActivatedRoute)
  location = inject(Location)
  router = inject(Router)

  servicioExtraService = inject(ServiciosExtraService)

  servicioExtra$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => this.servicioExtraService.getServicioExtraById(id))
  )

  handleEliminarEvent(servicioExtra: ServiciosExtra) {
    this.servicioExtraService.eliminarServicioExtra(servicioExtra).subscribe(() => {
      this.location.back()
    })
  }

  handleActualizarEvent(servicioExtra: ServiciosExtra) {
    this.router.navigate(['servicios-extra', servicioExtra.id, 'actualizar'])
  }

  volver() {
    this.location.back();
  }

}
