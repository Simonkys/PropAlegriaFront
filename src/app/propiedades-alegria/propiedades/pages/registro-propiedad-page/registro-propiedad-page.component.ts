import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Propiedad } from 'src/app/propiedades-alegria/propiedades/propiedad.model';
import { FormularioPropiedadComponent } from '../../components/formulario-propiedad/formulario-propiedad.component';

@Component({
  selector: 'app-registro-propiedad-page',
  standalone: true,
  imports: [CommonModule, FormularioPropiedadComponent],
  templateUrl: './registro-propiedad-page.component.html',
  styleUrls: ['./registro-propiedad-page.component.scss']
})
export class RegistroPropiedadPageComponent implements OnInit {

  router = inject(Router);
  route = inject(ActivatedRoute);
  location = inject(Location);

  propietarioId?: number;
  codigoPropiedad? : number;

  ngOnInit() {
    const state: any = this.location.getState();
    this.propietarioId = state['propietarioId'];
    this.codigoPropiedad = Number(state['cod'])
  
    if(!this.codigoPropiedad) {
      this.location.back();
    }
  }

  handleSubmitEvent(propiedad: Propiedad) {
    this.location.back();
  }


  handleCancelEvent() {
    this.location.back();
  }

}
