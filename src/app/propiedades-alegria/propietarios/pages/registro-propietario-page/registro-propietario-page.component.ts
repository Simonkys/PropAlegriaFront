import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormularioPropietarioComponent } from '../../components/formulario-propietario/formulario-propietario.component';
import { ActivatedRoute } from '@angular/router';
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
  propietarioService = inject(PropietarioService)


  handleSubmitEvent(propietarioForm: PropietarioForm) {
    this.propietarioService.registrarPropietario(propietarioForm)
      .subscribe(() => {
        this.location.back();
      })
  }

  handleCancelEvent() {
    this.location.back();
  }

}
