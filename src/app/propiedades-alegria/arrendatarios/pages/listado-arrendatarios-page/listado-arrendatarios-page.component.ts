import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoArrendatarioComponent } from '../../components/listado-arrendatario/listado-arrendatario.component';
import { ArrendatarioService } from '../../arrendatario.service';

@Component({
  selector: 'app-listado-arrendatarios-page',
  standalone: true,
  imports: [CommonModule, ListadoArrendatarioComponent],
  templateUrl: './listado-arrendatarios-page.component.html',
  styleUrls: ['./listado-arrendatarios-page.component.scss']
})
export class ListadoArrendatariosPageComponent {

  arrendatariosService = inject(ArrendatarioService)

  arrendatarios$ = this.arrendatariosService.getArrendatarios();

}
