import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrabajadorService } from '../../core/services/trabajador.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-detalle-trabajador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-trabajador.component.html',
  styleUrls: ['./detalle-trabajador.component.scss']
})
export class DetalleTrabajadorComponent {

  trabajadorService = inject(TrabajadorService);
  route = inject(ActivatedRoute);

  trabajador$ = this.route.paramMap.pipe(
    switchMap((params: ParamMap) => {
      const id = Number(params.get('id'))
      return this.trabajadorService.getTrabajadorById(id).pipe()
    })
  )
}
