import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormularioArriendoComponent } from '../../components/formulario-arriendo/formulario-arriendo.component';


@Component({
  selector: 'app-registro-arriendo-page',
  standalone: true,
  imports: [CommonModule, FormularioArriendoComponent],
  templateUrl: './registro-arriendo-page.component.html',
  styleUrls: ['./registro-arriendo-page.component.scss']
})
export class RegistroArriendoPageComponent {

  location = inject(Location)



  handleCancelEvent() {
    this.location.back()
  }


}
