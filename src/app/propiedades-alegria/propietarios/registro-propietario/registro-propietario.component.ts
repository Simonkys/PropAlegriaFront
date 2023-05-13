import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormularioPropietarioComponent } from '../../componentes/formulario-propietario/formulario-propietario.component';
import { ActivatedRoute } from '@angular/router';
import { Propietario } from '../../core/models/propietario.model';

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


  handleSubmitEvent(propietario: Propietario) {
    this.location.back();
  }

  handleCancelEvent() {
    this.location.back();
  }

}
