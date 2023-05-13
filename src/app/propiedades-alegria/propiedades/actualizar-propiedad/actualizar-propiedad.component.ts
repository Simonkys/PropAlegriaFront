import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { PropiedadesService } from '../../core/services/propiedades.service';
import { FormularioPropiedadComponent } from '../../componentes/formulario-propiedad/formulario-propiedad.component';
import { Propiedad } from '../../core/models/propiedad.model';

@Component({
  selector: 'app-actualizar-propiedad',
  standalone: true,
  imports: [CommonModule, FormularioPropiedadComponent],
  templateUrl: './actualizar-propiedad.component.html',
  styleUrls: ['./actualizar-propiedad.component.scss']
})
export class ActualizarPropiedadComponent {

  propiedadService = inject(PropiedadesService)
  route = inject(ActivatedRoute)
  location = inject(Location);

  propiedad$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => this.propiedadService.getPropiedad(id))
  )

  handleSubmitEvent(propiedad: Propiedad) {
    this.location.back();
  }


  handleCancelEvent() {
    this.location.back();
  }

}
