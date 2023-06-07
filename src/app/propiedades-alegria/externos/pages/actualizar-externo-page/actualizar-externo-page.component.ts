import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

import { ExternoService } from 'src/app/propiedades-alegria/externos/externo.service';
import { ExternoFormComponent } from '../../components/externo-form/externo-form.component';
import { ExternoForm } from '../../externo.model';

@Component({
  selector: 'app-actualizar-externo-page',
  standalone: true,
  imports: [CommonModule, ExternoFormComponent],
  templateUrl: './actualizar-externo-page.component.html',
  styleUrls: ['./actualizar-externo-page.component.scss']
})
export class ActualizarExternoPageComponent {

  externoService = inject(ExternoService)
  location = inject(Location)
  route = inject(ActivatedRoute)

  externo$ = this.route.paramMap.pipe(
  map(params => Number(params.get('id'))),
  switchMap(id => this.externoService.getExternoById(id))
  )

  submit(externoForm: ExternoForm) {
    this.externoService.actualizarExterno(externoForm)
      .pipe()
      .subscribe(() => this.location.back());
  }

  cancelar() {
    this.location.back()
  }

}
