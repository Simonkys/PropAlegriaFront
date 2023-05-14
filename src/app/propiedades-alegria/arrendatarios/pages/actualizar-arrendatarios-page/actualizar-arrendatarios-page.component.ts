import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormularioArrendatarioComponent } from '../../components/formulario-arrendatario/formulario-arrendatario.component';
import { ArrendatarioService } from '../../arrendatario.service';
import { ArrendatarioForm } from '../../arrendatario.model';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-actualizar-arrendatarios-page',
  standalone: true,
  imports: [CommonModule, FormularioArrendatarioComponent],
  templateUrl: './actualizar-arrendatarios-page.component.html',
  styleUrls: ['./actualizar-arrendatarios-page.component.scss']
})
export class ActualizarArrendatariosPageComponent {

  arrendatarioService = inject(ArrendatarioService)
  route = inject(ActivatedRoute)
  location = inject(Location)


  arrendatario$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => this.arrendatarioService.getArrendatario(id))
  )
  

  submit(arrendatarioForm: ArrendatarioForm) {
    this.arrendatarioService.actualizarArrendatario(arrendatarioForm)
      .pipe()
      .subscribe(() => this.location.back())
  }

  cancel() {
    this.location.back();
  }

}
