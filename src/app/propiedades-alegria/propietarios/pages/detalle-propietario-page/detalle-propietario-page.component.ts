import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { forkJoin, map, switchMap } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';

import { PropietarioService } from '../../propietario.service';
import { Propietario } from '../../propietario.model';
import { CuentaBancariaService } from '../../../core/services/cuenta-bancaria.service';
import { CuentaBancaria, CuentaBancariaForm } from '../../../core/models/cuenta-bancaria.models';
import { FormularioCuentaBancariaComponent } from '../../../componentes/formulario-cuenta-bancaria/formulario-cuenta-bancaria.component';
import { ListadoCuentaBancariaComponent } from '../../../componentes/listado-cuenta-bancaria/listado-cuenta-bancaria.component';
import { PropiedadesService } from '../../../propiedades/propiedades.service';
import { Propiedad } from '../../../propiedades/propiedad.model';
import { ListadoPropiedadComponent } from 'src/app/propiedades-alegria/propiedades/components/listado-propiedad/listado-propiedad.component';


@Component({
  selector: 'app-detalle-propietario-page',
  standalone: true,
  providers: [ConfirmationService],
  imports: [
    CommonModule, 
    FormularioCuentaBancariaComponent, 
    ListadoCuentaBancariaComponent, 
    ListadoPropiedadComponent,
    RouterLink,
    ConfirmPopupModule,
    ButtonModule
  ],
  templateUrl: './detalle-propietario-page.component.html',
  styleUrls: ['./detalle-propietario-page.component.scss']
})

export class DetallePropietarioPageComponent implements OnInit {
  propietarioService = inject(PropietarioService);
  cuentaBancariaService = inject(CuentaBancariaService);
  propiedadesService = inject(PropiedadesService);
  confimService = inject(ConfirmationService);

  route = inject(ActivatedRoute);
  router = inject(Router);
  

  propietario?: Propietario;
  cuentasBancarias: CuentaBancaria[] = [];
  propiedades: Propiedad[] = [];
  
  creacionCuentaActiva: boolean = false;


  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => this.propietarioService.getPropietario(id)),
      switchMap(propietario => { 
        const cuentasBancarias$ = this.cuentaBancariaService.getCuentasBancariasByRut(propietario.rut_prop)
        const propiedades$ = this.propiedadesService.getPropiedadesPorPropietario(propietario.id)

        return forkJoin([propiedades$, cuentasBancarias$]).pipe(
          map(([propiedades, cuentasBancarias]) => {
            return { propietario, propiedades, cuentasBancarias }
          })
        )
      })
    ).subscribe(({ propietario, propiedades, cuentasBancarias }) => {
      this.propietario = propietario;
      this.propiedades = propiedades
      this.cuentasBancarias = cuentasBancarias;
    })
  }

  guardarCuentaBancaria(cuentaBancariaForm: CuentaBancariaForm) {
    this.cuentaBancariaService.createCuentaBancaria(cuentaBancariaForm)
      .subscribe((cuenta) => {
        this.cuentasBancarias = [cuenta, ...this.cuentasBancarias];
        this.creacionCuentaActiva = false;
      })
  }

  eliminarCuentaBancaria(cuenta: CuentaBancaria) {
    this.cuentaBancariaService.eliminarCuentaBancaria(cuenta)
      .subscribe(() => {
        this.cuentasBancarias = this.cuentasBancarias.filter(cuentaBancaria => cuentaBancaria.id !== cuenta.id);
      })
  }
  
  cancelarCreacionCuentaBancaria() {
    this.creacionCuentaActiva = false;
  }

  activarCreacionCuentaBancaria() {
    this.creacionCuentaActiva = true;
  }

  crearPropiedad(propietario: Propietario) {
    this.router.navigate(['propiedades', 'registro'], {state:  {propietarioId: propietario.id}});
  }


  eliminarPropietario(event: Event, propietario: Propietario){
    this.confimService.confirm({
      target: event.target || new EventTarget(),
      message: `¿Estas segur@ de eliminar el propietario`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.propietarioService.eliminarPropietario(propietario)
          .pipe()
          .subscribe({
            next: () => {
              this.router.navigate(['propietarios', 'listado'])
            },
            error: (err) => {}
          })
      },
    });
  }

}
