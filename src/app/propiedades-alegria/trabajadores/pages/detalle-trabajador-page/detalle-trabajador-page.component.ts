import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrabajadorService } from '../../trabajador.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-detalle-trabajador-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-trabajador-page.component.html',
  styleUrls: ['./detalle-trabajador-page.component.scss']
})
export class DetalleTrabajadorPageComponent {

  trabajadorService = inject(TrabajadorService);
  route = inject(ActivatedRoute);

  trabajador$ = this.route.paramMap.pipe(
    switchMap((params: ParamMap) => {
      const id = Number(params.get('id'))
      return this.trabajadorService.getTrabajadorById(id).pipe()
    })
  )
}
