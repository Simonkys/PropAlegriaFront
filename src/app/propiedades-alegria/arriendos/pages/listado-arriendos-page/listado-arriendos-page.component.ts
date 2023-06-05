import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoArriendosComponent } from '../../components/listado-arriendos/listado-arriendos.component';
import { ArriendoService } from '../../arriendo.service';
import { Router } from '@angular/router';
import { Arriendo } from '../../arriendo.model';

@Component({
  selector: 'app-listado-arriendos-page',
  standalone: true,
  imports: [CommonModule, ListadoArriendosComponent],
  templateUrl: './listado-arriendos-page.component.html',
  styleUrls: ['./listado-arriendos-page.component.scss']
})
export class ListadoArriendosPageComponent {

  arriendosService = inject(ArriendoService)
  router = inject(Router)

  arriendos$ = this.arriendosService.getArriendos()


  handleRegistrarEvent() {
    this.router.navigate(['arriendos', 'registro'])
  }

  handleDetailEvent(arriendoId: number) {
    this.router.navigate(['arriendos', arriendoId, 'detalle'])
  }
}
