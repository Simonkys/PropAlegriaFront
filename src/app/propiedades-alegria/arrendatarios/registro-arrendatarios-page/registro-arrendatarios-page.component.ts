import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ArrendatarioForm } from '../../core/models/arrendatario.model';
import { ArrendatarioService } from '../../core/services/arrendatario.service';
import { FormularioArrendatarioComponent } from '../../componentes/formulario-arrendatario/formulario-arrendatario.component';

@Component({
  selector: 'app-registro-arrendatarios-page',
  standalone: true,
  imports: [CommonModule, FormularioArrendatarioComponent],
  templateUrl: './registro-arrendatarios-page.component.html',
  styleUrls: ['./registro-arrendatarios-page.component.scss']
})
export class RegistroArrendatariosPageComponent {

  arrendatarioService = inject(ArrendatarioService)
  location = inject(Location)



  submit(arrendatarioForm: ArrendatarioForm) {
    this.arrendatarioService.registrarArrendatario(arrendatarioForm)
      .pipe()
      .subscribe(() => this.location.back())
  }

  cancel() {
    this.location.back();
  }
}
