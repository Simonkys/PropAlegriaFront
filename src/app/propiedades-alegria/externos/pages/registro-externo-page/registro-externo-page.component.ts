import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { ExternoService } from 'src/app/propiedades-alegria/externos/externo.service';
import { ExternoFormComponent } from '../../components/externo-form/externo-form.component';
import { ExternoForm } from '../../externo.model';

@Component({
  selector: 'app-registro-externo-page',
  standalone: true,
  imports: [CommonModule, ExternoFormComponent],
  templateUrl: './registro-externo-page.component.html',
  styleUrls: ['./registro-externo-page.component.scss']
})
export class RegistroExternoPageComponent {

  externoService = inject(ExternoService);

  location = inject(Location);

  submit(externoForm: ExternoForm) {
      this.externoService.crearExterno(externoForm)
          .pipe()
          .subscribe(() => this.location.back())
  }

  cancelar() {
      this.location.back()
  }

}
