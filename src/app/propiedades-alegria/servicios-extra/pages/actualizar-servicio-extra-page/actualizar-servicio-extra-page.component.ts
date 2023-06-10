import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

import { ServiciosExtraForm } from '../../servicios-extra.model';
import { ServiciosExtraService } from '../../servicios-extra.service';
import { ServiciosExtraFormComponent } from '../../components/servicios-extra-form/servicios-extra-form.component';

@Component({
  selector: 'app-actualizar-servicio-extra-page',
  standalone: true,
  imports: [CommonModule, ServiciosExtraFormComponent],
  templateUrl: './actualizar-servicio-extra-page.component.html',
  styleUrls: ['./actualizar-servicio-extra-page.component.scss']
})
export class ActualizarServicioExtraPageComponent {

  serviciosExtraService = inject(ServiciosExtraService)
  route = inject(ActivatedRoute)
  location = inject(Location);

  servicioExtra$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => this.serviciosExtraService.getServicioExtraById(id))
  )

  handleSubmitEvent(servicioExtra: ServiciosExtraForm) {
    this.location.back();
  }

  handleCancelEvent() {
    this.location.back();
  }

}
