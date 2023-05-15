import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { TrabajadorService } from '../../trabajador.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs';


import { Trabajador } from '../../trabajador.model';
import { DetalleTrabajadorComponent } from '../../components/detalle-trabajador/detalle-trabajador.component';

@Component({
  selector: 'app-detalle-trabajador-page',
  standalone: true,
  imports: [CommonModule, DetalleTrabajadorComponent],
  templateUrl: './detalle-trabajador-page.component.html',
  styleUrls: ['./detalle-trabajador-page.component.scss']
})
export class DetalleTrabajadorPageComponent {

  trabajadorService = inject(TrabajadorService);
  
  router = inject(Router);
  location = inject(Location);
  route = inject(ActivatedRoute);

  trabajador$ = this.route.paramMap.pipe(
    switchMap((params: ParamMap) => {
      const id = Number(params.get('id'))
      return this.trabajadorService.getTrabajadorById(id).pipe()
    })
  )


  handleActualizarEvent(trabajador: Trabajador) {
    this.router.navigate(['trabajadores', trabajador.id, 'actualizar'])
  }

  handleEliminarEvent(trabajador: Trabajador){
    this.trabajadorService.eliminarTrabajador(trabajador)
      .subscribe(() => this.location.back())
  }
}
