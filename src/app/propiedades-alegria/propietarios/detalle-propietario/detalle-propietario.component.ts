import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropietarioService } from '../../core/services/propietario.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { CuentaBancariaService } from '../../core/services/cuenta-bancaria.service';

@Component({
  selector: 'app-detalle-propietario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-propietario.component.html',
  styleUrls: ['./detalle-propietario.component.scss']
})
export class DetallePropietarioComponent {
  propietarioService = inject(PropietarioService);
  cuentaBancariaService = inject(CuentaBancariaService);
  route = inject(ActivatedRoute);

  pageData$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => this.propietarioService.getPropietario(id)),
    switchMap(propietario => {
      return this.cuentaBancariaService.getCuentasBancariasByRut(propietario.rut_prop).pipe(
        map(cuentasBancarias => ({ propietario, cuentasBancarias}))
      )
    })
  )
  
}
