import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { Propiedad } from 'src/app/propiedades-alegria/propiedades/propiedad.model';
import { PropiedadesService } from 'src/app/propiedades-alegria/propiedades/propiedades.service';

@Component({
  selector: 'app-detalle-propiedad',
  standalone: true,
  providers: [ConfirmationService],
  imports: [CommonModule, RouterLink, ButtonModule, ConfirmPopupModule],
  templateUrl: './detalle-propiedad.component.html',
  styleUrls: ['./detalle-propiedad.component.scss']
})
export class DetallePropiedadComponent {

  propiedadService = inject(PropiedadesService)
  route = inject(ActivatedRoute)
  location = inject(Location);
  confimService = inject(ConfirmationService);

  propiedad$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => this.propiedadService.getPropiedad(id))
  )

  eliminarPropiedad(event: Event, propiedad: Propiedad) {
    this.confimService.confirm({
      target: event.target || new EventTarget(),
      message: `¿Estas segur@ de eliminar la propiedad`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.propiedadService.eliminarPropiedad(propiedad)
          .pipe()
          .subscribe({
            next: () => {
              this.location.back();
            },
            error: (err) => {}
          })
      },
    });
  }

}
