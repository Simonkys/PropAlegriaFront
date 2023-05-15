import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router} from '@angular/router';
import { map, switchMap } from 'rxjs';

import { Propiedad } from 'src/app/propiedades-alegria/propiedades/propiedad.model';
import { PropiedadesService } from 'src/app/propiedades-alegria/propiedades/propiedades.service';
import { DetallePropiedadComponent } from '../../components/detalle-propiedad/detalle-propiedad.component';

@Component({
  selector: 'app-detalle-propiedad-page',
  standalone: true,
  imports: [CommonModule, DetallePropiedadComponent],
  templateUrl: './detalle-propiedad-page.component.html',
  styleUrls: ['./detalle-propiedad-page.component.scss']
})
export class DetallePropiedadPageComponent {

  propiedadService = inject(PropiedadesService)
  route = inject(ActivatedRoute)
  router = inject(Router)
  location = inject(Location)

  propiedad$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => this.propiedadService.getPropiedad(id))
  )

  handleEliminarEvent(propiedad: Propiedad) {
    this.propiedadService.eliminarPropiedad(propiedad)
      .subscribe(() => this.location.back())
  }


  handleActulizarEvent(propiedad: Propiedad) {
    this.router.navigate(['propiedades', propiedad.id, 'actualizar'])
  }

  handleDetallePropietarioEvent(propietarioId: number) {
    this.router.navigate(['propietarios', propietarioId, 'detalle'])
  }

}
