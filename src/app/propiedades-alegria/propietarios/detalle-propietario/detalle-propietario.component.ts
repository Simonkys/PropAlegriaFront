import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropietarioService } from '../../core/services/propietario.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { CuentaBancariaService } from '../../core/services/cuenta-bancaria.service';
import { FormularioCuentaBancariaComponent } from '../../componentes/formulario-cuenta-bancaria/formulario-cuenta-bancaria.component';
import { CuentaBancaria } from '../../core/models/cuenta-bancaria.models';
import { Propietario } from '../../core/models/propietario.model';
import { ListadoCuentaBancariaComponent } from '../../componentes/listado-cuenta-bancaria/listado-cuenta-bancaria.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-detalle-propietario',
  standalone: true,
  imports: [CommonModule, FormularioCuentaBancariaComponent, ListadoCuentaBancariaComponent, ButtonModule],
  templateUrl: './detalle-propietario.component.html',
  styleUrls: ['./detalle-propietario.component.scss']
})

export class DetallePropietarioComponent implements OnInit {
  propietarioService = inject(PropietarioService);
  cuentaBancariaService = inject(CuentaBancariaService);
  route = inject(ActivatedRoute);
  

  propietario?: Propietario;
  cuentasBancarias: CuentaBancaria[] = [];
  creacionCuentaActiva: boolean = false;


  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => this.propietarioService.getPropietario(id)),
      switchMap(propietario => { return this.cuentaBancariaService.getCuentasBancariasByRut(propietario.rut_prop).pipe(
          map(cuentasBancarias => ({ propietario, cuentasBancarias}))
        )
      })
    ).subscribe(({ propietario, cuentasBancarias }) => {
      this.propietario = propietario;
      this.cuentasBancarias = cuentasBancarias;
    })
  }

  guardarCuentaBancaria(cuenta: CuentaBancaria) {
    this.cuentasBancarias = [cuenta, ...this.cuentasBancarias];
    this.creacionCuentaActiva = false;
  }

  eliminarCuentaBancaria(cuentaId: number) {
    this.cuentasBancarias = this.cuentasBancarias.filter(cuentaBancaria => cuentaBancaria.id !== cuentaId);
  }
  
  cancelarCreacionCuentaBancaria() {
    this.creacionCuentaActiva = false;
  }

  activarCreacionCuentaBancaria() {
    this.creacionCuentaActiva = true;
  }

}
