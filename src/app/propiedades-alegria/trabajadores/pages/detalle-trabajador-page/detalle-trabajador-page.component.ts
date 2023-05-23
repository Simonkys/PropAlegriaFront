import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { TrabajadorService } from '../../trabajador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';


import { Trabajador } from '../../trabajador.model';
import { DetalleTrabajadorComponent } from '../../components/detalle-trabajador/detalle-trabajador.component';
import { ListadoCuentaBancariaComponent } from 'src/app/propiedades-alegria/cuentas-bancarias/components/listado-cuenta-bancaria/listado-cuenta-bancaria.component';
import { CuentaBancariaService } from 'src/app/propiedades-alegria/cuentas-bancarias/cuenta-bancaria.service';
import { FormularioCuentaBancariaComponent } from 'src/app/propiedades-alegria/cuentas-bancarias/components/formulario-cuenta-bancaria/formulario-cuenta-bancaria.component';
import { CuentaBancaria } from 'src/app/propiedades-alegria/cuentas-bancarias/cuenta-bancaria.models';

@Component({
  selector: 'app-detalle-trabajador-page',
  standalone: true,
  imports: [CommonModule, DetalleTrabajadorComponent, ListadoCuentaBancariaComponent, FormularioCuentaBancariaComponent],
  templateUrl: './detalle-trabajador-page.component.html',
  styleUrls: ['./detalle-trabajador-page.component.scss']
})
export class DetalleTrabajadorPageComponent {

  trabajadorService = inject(TrabajadorService);
  cuentaBancariaService = inject(CuentaBancariaService);
  
  router = inject(Router);
  location = inject(Location);
  route = inject(ActivatedRoute);

  creacionCuentaActiva: boolean = false;
  cuentaBancaria?: CuentaBancaria

  trabajador$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => this.trabajadorService.getTrabajadorById(id)),
    switchMap(trabajador => {
      const cuentasBancarias$ = this.cuentaBancariaService.getCuentasBancariasByRut(trabajador.rut_trab)
      return cuentasBancarias$.pipe(
        map(_ => trabajador)
      )
    })
  )


  handleActualizarEvent(trabajador: Trabajador) {
    this.router.navigate(['trabajadores', trabajador.id, 'actualizar'])
  }

  handleEliminarEvent(trabajador: Trabajador){
    this.trabajadorService.eliminarTrabajador(trabajador)
      .subscribe(() => this.location.back())
  }


  guardarCuentaBancaria(result: boolean) {
    if(result) {
      this.cancelarCreacionCuentaBancaria()
    }
  }

  actualizarCuentaBancaria(cuentaBancaria: CuentaBancaria) {
    this.cuentaBancaria = cuentaBancaria
    this.activarCreacionCuentaBancaria()
  }

  eliminarCuentaBancaria(result: boolean) {}

  cancelarCreacionCuentaBancaria() {
    this.creacionCuentaActiva = false;
    this.cuentaBancaria = undefined
  }

  activarCreacionCuentaBancaria() {
    this.creacionCuentaActiva = true;
  }
}
