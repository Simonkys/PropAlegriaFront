import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { PropietarioService } from '../../core/services/propietario.service';
import { Propietario } from '../../core/models/propietario.model';
import { FormularioPropietarioComponent } from '../../componentes/formulario-propietario/formulario-propietario.component';


@Component({
  selector: 'app-actualizar-propietario',
  standalone: true,
  imports: [CommonModule, FormularioPropietarioComponent],
  templateUrl: './actualizar-propietario.component.html',
  styleUrls: ['./actualizar-propietario.component.scss']
})
export class ActualizarPropietarioComponent {

  propietarioService = inject(PropietarioService)
  location = inject(Location)
  route = inject(ActivatedRoute)

  propietario$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => this.propietarioService.getPropietario(id))
  )

  handleSubmitEvent(propietario: Propietario) {
    this.location.back();
  }

  handleCancelEvent() {
    this.location.back();
  }

}
