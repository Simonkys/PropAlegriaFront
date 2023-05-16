import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormularioPropietarioComponent } from '../../components/formulario-propietario/formulario-propietario.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PropietarioForm } from '../../propietario.model';
import { PropietarioService } from '../../propietario.service';

@Component({
  selector: 'app-registro-propietario-page',
  standalone: true,
  imports: [
    CommonModule, 
    FormularioPropietarioComponent
  ],
  templateUrl: './registro-propietario-page.component.html',
  styleUrls: ['./registro-propietario-page.component.scss']
})
export class RegistroPropietarioPageComponent {
  
  location = inject(Location)
  route = inject(ActivatedRoute)
  router = inject(Router)
  propietarioService = inject(PropietarioService)


  handleSubmitEvent(propietarioForm: PropietarioForm) {
    this.propietarioService.registrarPropietario(propietarioForm)
      .subscribe((propietario) => {
        this.router.navigate(['propietarios', propietario.id, 'detalle'])
      })
  }

  handleCancelEvent() {
    this.location.back();
  }

}
