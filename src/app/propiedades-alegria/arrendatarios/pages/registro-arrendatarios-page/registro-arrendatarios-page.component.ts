import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { ArrendatarioForm } from '../../arrendatario.model';
import { ArrendatarioService } from '../../arrendatario.service';
import { FormularioArrendatarioComponent } from '../../components/formulario-arrendatario/formulario-arrendatario.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-arrendatarios-page',
  standalone: true,
  imports: [CommonModule, FormularioArrendatarioComponent],
  templateUrl: './registro-arrendatarios-page.component.html',
  styleUrls: ['./registro-arrendatarios-page.component.scss']
})
export class RegistroArrendatariosPageComponent  {
  

  arrendatarioService = inject(ArrendatarioService)
  location = inject(Location)
  router = inject(Router)



  submit(arrendatarioForm: ArrendatarioForm) {
    this.arrendatarioService.registrarArrendatario(arrendatarioForm)
      .pipe()
      .subscribe((arrendatario) => this.router.navigate(['arrendatarios', arrendatario.id, 'detalle']))
  }

  cancel() {
    this.location.back();
  }
}
