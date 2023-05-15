import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormularioArriendoComponent } from '../../components/formulario-arriendo/formulario-arriendo.component';
import { ArriendoForm } from '../../arriendo.model';
import { ArriendoService } from '../../arriendo.service';


@Component({
  selector: 'app-registro-arriendo-page',
  standalone: true,
  imports: [CommonModule, FormularioArriendoComponent],
  templateUrl: './registro-arriendo-page.component.html',
  styleUrls: ['./registro-arriendo-page.component.scss']
})
export class RegistroArriendoPageComponent {

  location = inject(Location)
  arriendoService = inject(ArriendoService)



  handleSubmitEvent(formularioArriendo: ArriendoForm) {
    this.arriendoService.createArriendo(formularioArriendo).subscribe()
  }

  handleCancelEvent() {
    this.location.back()
  }


}
