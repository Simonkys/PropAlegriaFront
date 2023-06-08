import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormularioArriendoComponent } from '../../components/formulario-arriendo/formulario-arriendo.component';
import { ArriendoForm } from '../../arriendo.model';
import { ArriendoService } from '../../arriendo.service';
import { Arrendatario } from 'src/app/propiedades-alegria/arrendatarios/arrendatario.model';
import { Propiedad } from 'src/app/propiedades-alegria/propiedades/propiedad.model';


@Component({
  selector: 'app-registro-arriendo-page',
  standalone: true,
  imports: [CommonModule, FormularioArriendoComponent],
  templateUrl: './registro-arriendo-page.component.html',
  styleUrls: ['./registro-arriendo-page.component.scss']
})
export class RegistroArriendoPageComponent implements OnInit {

  location = inject(Location)

  arriendoService = inject(ArriendoService)


  arrendatario?: Arrendatario
  propiedad?: Propiedad


  ngOnInit(): void {
    const state: any = this.location.getState();

    this.arrendatario = state['arrendatario'];
    this.propiedad = state['propiedad']
  }



  handleSubmitEvent(formularioArriendo: ArriendoForm) {
    this.arriendoService.createArriendo(formularioArriendo).subscribe(() => {
      this.location.back()
    })
  }

  handleCancelEvent() {
    this.location.back()
  }


}
