import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ServiciosExtraFormComponent } from '../../components/servicios-extra-form/servicios-extra-form.component';
import { ServiciosExtraForm } from '../../servicios-extra.model';
import { ServiciosExtraService } from '../../servicios-extra.service';
import { Propiedad } from 'src/app/propiedades-alegria/propiedades/propiedad.model';


@Component({
  selector: 'app-registro-servicio-extra-page',
  standalone: true,
  imports: [CommonModule, ServiciosExtraFormComponent],
  templateUrl: './registro-servicio-extra-page.component.html',
  styleUrls: ['./registro-servicio-extra-page.component.scss']
})
export class RegistroServicioExtraPageComponent implements OnInit {

  location = inject(Location)
  servicioExtraService = inject(ServiciosExtraService)
  propiedad?: Propiedad

  ngOnInit(): void {
    const state: any = this.location.getState();
    this.propiedad = state['propiedad']
  }

  handleSubmitEvent(serviciosExtraForm: ServiciosExtraForm) {
    this.servicioExtraService.crearServicioExtra(serviciosExtraForm).subscribe(() => {
      this.location.back()
    })
  }

  handleCancelEvent() {
    this.location.back()
  }

}
