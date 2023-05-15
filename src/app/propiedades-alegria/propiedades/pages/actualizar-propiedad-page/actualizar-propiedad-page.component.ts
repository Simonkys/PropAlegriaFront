import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Propiedad } from 'src/app/propiedades-alegria/propiedades/propiedad.model';
import { PropiedadesService } from 'src/app/propiedades-alegria/propiedades/propiedades.service';
import { FormularioPropiedadComponent } from '../../components/formulario-propiedad/formulario-propiedad.component';

@Component({
  selector: 'app-actualizar-propiedad-page',
  standalone: true,
  imports: [CommonModule, FormularioPropiedadComponent],
  templateUrl: './actualizar-propiedad-page.component.html',
  styleUrls: ['./actualizar-propiedad-page.component.scss']
})
export class ActualizarPropiedadPageComponent {

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
