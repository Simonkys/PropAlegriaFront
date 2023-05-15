import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Propiedad } from 'src/app/propiedades-alegria/propiedades/propiedad.model';
import { FormularioPropiedadComponent } from '../../components/formulario-propiedad/formulario-propiedad.component';

@Component({
  selector: 'app-registro-propiedad',
  standalone: true,
  imports: [CommonModule, FormularioPropiedadComponent],
  templateUrl: './registro-propiedad.component.html',
  styleUrls: ['./registro-propiedad.component.scss']
})
export class RegistroPropiedadComponent implements OnInit {

  router = inject(Router);
  route = inject(ActivatedRoute);
  location = inject(Location);

  propietarioId?: number;

  ngOnInit() {
    const state: any = this.location.getState();
    this.propietarioId = state['propietarioId'];
  }

  handleSubmitEvent(propiedad: Propiedad) {
    this.location.back();
  }


  handleCancelEvent() {
    this.location.back();
  }

}
