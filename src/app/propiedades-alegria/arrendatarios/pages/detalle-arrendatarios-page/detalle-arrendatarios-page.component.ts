import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, map, switchMap } from 'rxjs';

import { ArrendatarioService } from '../../arrendatario.service';
import { Arrendatario, ArriendoArrendatario } from '../../arrendatario.model';
import { DetalleArrendatarioComponent } from '../../components/detalle-arrendatario/detalle-arrendatario.component';
import { FormularioCuentaBancariaComponent } from '../../../cuentas-bancarias/components/formulario-cuenta-bancaria/formulario-cuenta-bancaria.component';
import { ListadoCuentaBancariaComponent } from '../../../cuentas-bancarias/components/listado-cuenta-bancaria/listado-cuenta-bancaria.component';
import { CuentaBancaria } from '../../../cuentas-bancarias/cuenta-bancaria.models';
import { CuentaBancariaService } from '../../../cuentas-bancarias/cuenta-bancaria.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DetalleArriendo } from 'src/app/propiedades-alegria/core/models/detalle-arriendo.model';
import { DetalleArriendoService } from 'src/app/propiedades-alegria/core/services/detalle-arriendo.service';


@Component({
  selector: 'app-detalle-arrendatarios-page',
  standalone: true,
  imports: [
    CommonModule,
    DetalleArrendatarioComponent, 
    FormularioCuentaBancariaComponent, 
    ListadoCuentaBancariaComponent,
    TableModule,
    ButtonModule
  ],
  templateUrl: './detalle-arrendatarios-page.component.html',
  styleUrls: ['./detalle-arrendatarios-page.component.scss']
})
export class DetalleArrendatariosPageComponent implements OnInit {

  cuentaBancariaService = inject(CuentaBancariaService);
  arrendatarioService = inject(ArrendatarioService)
  detalleArriendoService = inject(DetalleArriendoService)

  router = inject(Router)
  route = inject(ActivatedRoute)
  location = inject(Location)

  arrendatario?: Arrendatario;
  arriendo: ArriendoArrendatario | null = null;
  
  creacionCuentaActiva: boolean = false;
  cuentaBancaria?: CuentaBancaria
  

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),

      switchMap(id => this.arrendatarioService.getArrendatarioArriendo(id)),

      switchMap(arrendatarioArriendo => {
        const {arriendo, ...arrendatario} = arrendatarioArriendo

        const cuentasBancarias$ = this.cuentaBancariaService.getCuentasBancariasByRut(arrendatario.rut_arr)

        return forkJoin([cuentasBancarias$]).pipe(
          map(([cuentasBancarias]) => {
            return {cuentasBancarias, arrendatario, arriendo}
          })
        )
      })
    ).subscribe(({ arrendatario, arriendo}) => {
      this.arrendatario = arrendatario;
      this.arriendo = arriendo;
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

  
  editarPago(detalleArr: DetalleArriendo) {
    this.router.navigate(['arrendatarios', 'registro-pago'], {state: {registroPago: detalleArr}})
  }
  

}
