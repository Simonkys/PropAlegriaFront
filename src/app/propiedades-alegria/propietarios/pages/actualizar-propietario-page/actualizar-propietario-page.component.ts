import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { PropietarioService } from '../../propietario.service';
import { PropietarioForm } from '../../propietario.model';
import { FormularioPropietarioComponent } from '../../components/formulario-propietario/formulario-propietario.component';


@Component({
  selector: 'app-actualizar-propietario-page',
  standalone: true,
  imports: [CommonModule, FormularioPropietarioComponent],
  templateUrl: './actualizar-propietario-page.component.html',
  styleUrls: ['./actualizar-propietario-page.component.scss']
})
export class ActualizarPropietarioPageComponent {

  propietarioService = inject(PropietarioService)
  location = inject(Location)
  route = inject(ActivatedRoute)

  propietario$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => this.propietarioService.getPropietario(id))
  )

  handleSubmitEvent(propietarioForm: PropietarioForm) {
    this.propietarioService.actualizarPropietario(propietarioForm)
      .subscribe(() => {
        this.location.back();
      })
  }

  handleCancelEvent() {
    this.location.back();
  }

}
