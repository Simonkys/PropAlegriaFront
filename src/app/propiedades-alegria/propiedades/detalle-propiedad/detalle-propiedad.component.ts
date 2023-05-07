import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropiedadesService } from '../../core/services/propiedades.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-detalle-propiedad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-propiedad.component.html',
  styleUrls: ['./detalle-propiedad.component.scss']
})
export class DetallePropiedadComponent {

  propiedadService = inject(PropiedadesService)
  route = inject(ActivatedRoute)

  propiedad$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => this.propiedadService.getPropiedad(id))
  )

}
