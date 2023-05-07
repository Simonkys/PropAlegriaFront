import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropietarioService } from '../../core/services/propietario.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-detalle-propietario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-propietario.component.html',
  styleUrls: ['./detalle-propietario.component.scss']
})
export class DetallePropietarioComponent {
  propietarioService = inject(PropietarioService);
  route = inject(ActivatedRoute);


  propietario$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => this.propietarioService.getPropietario(id))
  )
}
