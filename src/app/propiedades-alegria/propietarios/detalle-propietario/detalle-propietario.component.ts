import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropietarioService } from '../../core/services/propietario.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { forkJoin, map, switchMap } from 'rxjs';
import { CuentaBancariaService } from '../../core/services/cuenta-bancaria.service';
import { FormularioCuentaBancariaComponent } from '../../componentes/formulario-cuenta-bancaria/formulario-cuenta-bancaria.component';
import { CuentaBancaria, CuentaBancariaForm } from '../../core/models/cuenta-bancaria.models';
import { Propietario } from '../../core/models/propietario.model';
import { ListadoCuentaBancariaComponent } from '../../componentes/listado-cuenta-bancaria/listado-cuenta-bancaria.component';
import { ButtonModule } from 'primeng/button';
import { PropiedadesService } from '../../core/services/propiedades.service';
import { Propiedad } from '../../core/models/propiedad.model';
import { ListadoPropiedadComponent } from '../../componentes/listado-propiedad/listado-propiedad.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-detalle-propietario',
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
  templateUrl: './detalle-propietario.component.html',
  styleUrls: ['./detalle-propietario.component.scss']
})

export class DetallePropietarioComponent implements OnInit {
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
