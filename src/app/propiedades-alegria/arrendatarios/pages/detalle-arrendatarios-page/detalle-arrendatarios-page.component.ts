import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';

import { ArrendatarioService } from '../../arrendatario.service';
import { Arrendatario } from '../../arrendatario.model';
import { DetalleArrendatarioComponent } from '../../components/detalle-arrendatario/detalle-arrendatario.component';
import { FormularioCuentaBancariaComponent } from '../../../cuentas-bancarias/components/formulario-cuenta-bancaria/formulario-cuenta-bancaria.component';
import { ListadoCuentaBancariaComponent } from '../../../cuentas-bancarias/components/listado-cuenta-bancaria/listado-cuenta-bancaria.component';
import { CuentaBancaria, CuentaBancariaForm } from '../../../cuentas-bancarias/cuenta-bancaria.models';
import { CuentaBancariaService } from '../../../cuentas-bancarias/cuenta-bancaria.service';

@Component({
  selector: 'app-detalle-arrendatarios-page',
  standalone: true,
  imports: [CommonModule, DetalleArrendatarioComponent, FormularioCuentaBancariaComponent, ListadoCuentaBancariaComponent],
  templateUrl: './detalle-arrendatarios-page.component.html',
  styleUrls: ['./detalle-arrendatarios-page.component.scss']
})
export class DetalleArrendatariosPageComponent implements OnInit {

  cuentaBancariaService = inject(CuentaBancariaService);
  arrendatarioService = inject(ArrendatarioService)

  router = inject(Router)
  route = inject(ActivatedRoute)
  location = inject(Location)

  creacionCuentaActiva: boolean = false;

  arrendatario?: Arrendatario;

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => this.arrendatarioService.getArrendatario(id)),
      switchMap(arrendatario => {
        return this.cuentaBancariaService.getCuentasBancariasByRut(arrendatario.rut_arr).pipe(
          map(() => arrendatario)
        )
      })
    ).subscribe((arrendatario) => {
      this.arrendatario = arrendatario;
    })
  }

  handleActualizarEvent(arrendatario: Arrendatario) {
    this.router.navigate(['arrendatarios', arrendatario.id, 'actualizar'])
  }

  handleEliminarEvent(arrendatario: Arrendatario) {
    this.arrendatarioService.eliminarArrendatario(arrendatario)
    .pipe()
    .subscribe(() => this.location.back())
  }

  guardarCuentaBancaria(cuentaBancariaForm: CuentaBancariaForm) {
    this.cuentaBancariaService.createCuentaBancaria(cuentaBancariaForm)
      .subscribe((cuenta) => this.creacionCuentaActiva = false)
  }

  eliminarCuentaBancaria(cuenta: CuentaBancaria) {
    this.cuentaBancariaService.eliminarCuentaBancaria(cuenta)
      .subscribe()
  }

  cancelarCreacionCuentaBancaria() {
    this.creacionCuentaActiva = false;
  }

  activarCreacionCuentaBancaria() {
    this.creacionCuentaActiva = true;
  }

}
