import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormularioPropietarioComponent } from '../../componentes/formulario-propietario/formulario-propietario.component';
import { ActivatedRoute } from '@angular/router';
import { PropietarioForm } from '../../core/models/propietario.model';
import { PropietarioService } from '../../core/services/propietario.service';

@Component({
  selector: 'app-registro-propietario',
  standalone: true,
  imports: [
    CommonModule, 
    FormularioPropietarioComponent
  ],
  templateUrl: './registro-propietario.component.html',
  styleUrls: ['./registro-propietario.component.scss']
})
export class RegistroPropietarioComponent {
  
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
