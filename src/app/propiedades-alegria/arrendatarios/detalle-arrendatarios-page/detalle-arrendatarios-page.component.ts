import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { DetalleArrendatarioComponent } from '../../componentes/detalle-arrendatario/detalle-arrendatario.component';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ArrendatarioService } from '../../core/services/arrendatario.service';
import { Arrendatario } from '../../core/models/arrendatario.model';

@Component({
  selector: 'app-detalle-arrendatarios-page',
  standalone: true,
  imports: [CommonModule, DetalleArrendatarioComponent],
  templateUrl: './detalle-arrendatarios-page.component.html',
  styleUrls: ['./detalle-arrendatarios-page.component.scss']
})
export class DetalleArrendatariosPageComponent {

  route = inject(ActivatedRoute)
  location = inject(Location)
  arrendatarioService = inject(ArrendatarioService)

  arrendatario$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => this.arrendatarioService.getArrendatario(id))
  )


  eliminar(arrendatario: Arrendatario) {
    this.arrendatarioService.eliminarArrendatario(arrendatario)
    .pipe()
    .subscribe(() => this.location.back())
  }

}
