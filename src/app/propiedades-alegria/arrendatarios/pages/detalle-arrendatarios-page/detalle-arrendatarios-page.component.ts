import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { DetalleArrendatarioComponent } from '../../components/detalle-arrendatario/detalle-arrendatario.component';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ArrendatarioService } from '../../arrendatario.service';
import { Arrendatario } from '../../arrendatario.model';
import { FormularioCuentaBancariaComponent } from '../../../componentes/formulario-cuenta-bancaria/formulario-cuenta-bancaria.component';
import { ListadoCuentaBancariaComponent } from '../../../componentes/listado-cuenta-bancaria/listado-cuenta-bancaria.component';
import { CuentaBancaria, CuentaBancariaForm } from '../../../core/models/cuenta-bancaria.models';
import { CuentaBancariaService } from '../../../core/services/cuenta-bancaria.service';

@Component({
  selector: 'app-detalle-arrendatarios-page',
  standalone: true,
  imports: [CommonModule, DetalleArrendatarioComponent, FormularioCuentaBancariaComponent, ListadoCuentaBancariaComponent],
  templateUrl: './detalle-arrendatarios-page.component.html',
  styleUrls: ['./detalle-arrendatarios-page.component.scss']
})
export class DetalleArrendatariosPageComponent implements OnInit {
  route = inject(ActivatedRoute)
  location = inject(Location)
  cuentaBancariaService = inject(CuentaBancariaService);
  arrendatarioService = inject(ArrendatarioService)

  creacionCuentaActiva: boolean = false;

  arrendatario?: Arrendatario;
  cuentasBancarias: CuentaBancaria[] = [];

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => this.arrendatarioService.getArrendatario(id)),
      switchMap(arrendatario => {
        return this.cuentaBancariaService.getCuentasBancariasByRut(arrendatario.rut_arr).pipe(
          map((cuentasBancarias) => ({cuentasBancarias, arrendatario}))
        )
      })
    ).subscribe((data) => {
      this.arrendatario = data.arrendatario;
      this.cuentasBancarias = data.cuentasBancarias;
    })
  }


  eliminar(arrendatario: Arrendatario) {
    this.arrendatarioService.eliminarArrendatario(arrendatario)
    .pipe()
    .subscribe(() => this.location.back())
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

}
