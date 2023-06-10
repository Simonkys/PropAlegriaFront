import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, forkJoin, map, switchMap } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';

import { Propiedad } from 'src/app/propiedades-alegria/propiedades/propiedad.model';
import { PropiedadesService } from 'src/app/propiedades-alegria/propiedades/propiedades.service';
import { DetallePropiedadComponent } from '../../components/detalle-propiedad/detalle-propiedad.component';

import { ArriendoService } from 'src/app/propiedades-alegria/arriendos/arriendo.service';
import { TablaArriendo } from 'src/app/propiedades-alegria/arriendos/arriendo.model';

import { ServiciosExtraService } from 'src/app/propiedades-alegria/servicios-extra/servicios-extra.service'
import { ServiciosExtra } from 'src/app/propiedades-alegria/servicios-extra/servicios-extra.model'
import { ListadoServiciosExtraComponent } from 'src/app/propiedades-alegria/servicios-extra/components/listado-servicios-extra/listado-servicios-extra.component';

@Component({
  selector: 'app-detalle-propiedad-page',
  standalone: true,
  providers: [ConfirmationService],
  imports: [
    CommonModule, 
    DetallePropiedadComponent, 
    ButtonModule, 
    ConfirmPopupModule, 
    TooltipModule, 
    ListadoServiciosExtraComponent
  ],
  templateUrl: './detalle-propiedad-page.component.html',
  styleUrls: ['./detalle-propiedad-page.component.scss']
})
export class DetallePropiedadPageComponent implements OnDestroy, OnInit {
  
  confimService = inject(ConfirmationService);
  propiedadService = inject(PropiedadesService);
  arriendoService = inject(ArriendoService);
  

  route = inject(ActivatedRoute);
  router = inject(Router);
  location = inject(Location);

  propiedad?: Propiedad
  arriendos: TablaArriendo[] = []

  sub?: Subscription

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => {
        const propiedad$ = this.propiedadService.getPropiedad(id)
        const arriendos$ = this.arriendoService.getArriendos({propiedad: id, estado_arriendo: true})
        
        return forkJoin([propiedad$, arriendos$])
      })
    ).subscribe(([propiedad, arriendos]) => {
      this.propiedad = propiedad
      this.arriendos = arriendos
    })
  }

  ngOnDestroy(): void {
    if(this.sub) {this.sub.unsubscribe()}
  }


  eliminar(event: Event, propiedad: Propiedad){
    this.confimService.confirm({
      target: event.target || new EventTarget(),
      message: `¿Estas segur@ de eliminar la propiedad`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.propiedadService.eliminarPropiedad(propiedad)
      .subscribe(() => this.location.back())
      },
    });
  }


  actualizar(propiedad: Propiedad) {
    this.router.navigate(['propiedades', propiedad.id, 'actualizar'])
  }


  volver() {
    this.location.back();
  }

  verDetalleArriendo(arriendo: TablaArriendo) {
    this.router.navigate(['arriendos', arriendo.arriendo_id, 'detalle'])
  }

  registrarArriendo(propiedad: Propiedad) {
    this.router.navigate(['arriendos', 'registro'], {state: {propiedad}})
  }

}
