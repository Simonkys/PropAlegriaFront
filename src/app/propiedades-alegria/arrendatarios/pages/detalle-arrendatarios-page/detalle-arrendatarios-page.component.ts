import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, map, switchMap } from 'rxjs';

import { ArrendatarioService } from '../../arrendatario.service';
import { Arrendatario } from '../../arrendatario.model';
import { DetalleArrendatarioComponent } from '../../components/detalle-arrendatario/detalle-arrendatario.component';
import { FormularioCuentaBancariaComponent } from '../../../cuentas-bancarias/components/formulario-cuenta-bancaria/formulario-cuenta-bancaria.component';
import { ListadoCuentaBancariaComponent } from '../../../cuentas-bancarias/components/listado-cuenta-bancaria/listado-cuenta-bancaria.component';
import { CuentaBancaria } from '../../../cuentas-bancarias/cuenta-bancaria.models';
import { CuentaBancariaService } from '../../../cuentas-bancarias/cuenta-bancaria.service';
import { ListadoArriendosComponent } from 'src/app/propiedades-alegria/arriendos/components/listado-arriendos/listado-arriendos.component';
import { Arriendo, TablaArriendo } from 'src/app/propiedades-alegria/arriendos/arriendo.model';
import { ArriendoService } from 'src/app/propiedades-alegria/arriendos/arriendo.service';

@Component({
  selector: 'app-detalle-arrendatarios-page',
  standalone: true,
  imports: [
    CommonModule, 
    DetalleArrendatarioComponent, 
    ListadoArriendosComponent,
    FormularioCuentaBancariaComponent, 
    ListadoCuentaBancariaComponent],
  templateUrl: './detalle-arrendatarios-page.component.html',
  styleUrls: ['./detalle-arrendatarios-page.component.scss']
})
export class DetalleArrendatariosPageComponent implements OnInit {

  cuentaBancariaService = inject(CuentaBancariaService);
  arrendatarioService = inject(ArrendatarioService)
  arriendoService = inject(ArriendoService)

  router = inject(Router)
  route = inject(ActivatedRoute)
  location = inject(Location)

  
  arrendatario?: Arrendatario
  arriendos: TablaArriendo[] = []
  
  creacionCuentaActiva: boolean = false;
  cuentaBancaria?: CuentaBancaria

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => this.arrendatarioService.getArrendatario(id)),
      switchMap(arrendatario => {
        const arriendos$ = this.arriendoService.getArriendoByArrendatario(arrendatario.id)
        const cuentasBancarias$ = this.cuentaBancariaService.getCuentasBancariasByRut(arrendatario.rut_arr)

        return forkJoin([arriendos$, cuentasBancarias$]).pipe(
          map(([arriendos, cuentasBancarias]) => {
            return {arriendos, cuentasBancarias, arrendatario}
          })
        )
      })
    ).subscribe(({arriendos, arrendatario}) => {
      this.arrendatario = arrendatario;
      this.arriendos = arriendos
    })
  }

  handleActualizarEvent(arrendatario: Arrendatario) {
    this.router.navigate(['arrendatarios', arrendatario.id, 'actualizar'])
  }

  handleEliminarEvent(arrendatario: Arrendatario) {
    this.arrendatarioService.eliminarArrendatario(arrendatario)
    .pipe()
    .subscribe(() => this.router.navigate(['arrendatarios', 'listado']))
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

  handleRegistroArriendoEvent(arrendatario: Arrendatario) {
    this.router.navigate(['arriendos', 'registro'], {state:  {arrendatario: arrendatario}})
  }

  handleDetalleArriendoEvent(arriendoId: number){
    this.router.navigate(['arriendos', arriendoId, 'detalle'])
  }

}
