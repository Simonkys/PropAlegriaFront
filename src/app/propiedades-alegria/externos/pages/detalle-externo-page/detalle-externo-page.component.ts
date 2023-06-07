import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';

import { ExternoService } from '../../externo.service';
import { Externo } from '../../externo.model';
import { DetalleExternoComponent } from '../../components/detalle-externo/detalle-externo.component';

@Component({
  selector: 'app-detalle-externo-page',
  standalone: true,
  imports: [CommonModule, DetalleExternoComponent],
  templateUrl: './detalle-externo-page.component.html',
  styleUrls: ['./detalle-externo-page.component.scss']
})
export class DetalleExternoPageComponent {

  externoService = inject(ExternoService);
  
  router = inject(Router);
  location = inject(Location);
  route = inject(ActivatedRoute);

  externo$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => this.externoService.getExternoById(id)),
  )

  handleActualizarEvent(externo: Externo) {
    this.router.navigate(['externos', externo.id, 'actualizar'])
  }

  handleEliminarEvent(externo: Externo){
    this.externoService.eliminarExterno(externo)
      .subscribe(() => this.location.back())
  }

}
