import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';


import { UsuarioService } from '../../core/services/usuario.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UsuarioConPermiso } from '../../core/models/usuario.model';
import { finalize, map } from 'rxjs';
import { TrabajadorService } from '../../trabajadores/trabajador.service';
import { PermisoService } from '../../core/services/permiso.service';

@Component({
  selector: 'app-listado-usuarios',
  standalone: true,
  providers: [ConfirmationService],
  imports: [CommonModule, TableModule, TagModule, ToolbarModule, ButtonModule, InputTextModule, ConfirmPopupModule],
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss']
})
export class ListadoUsuariosComponent {

  usuarioService = inject(UsuarioService)
  authService = inject(AuthService)
  router = inject(Router)
  confimService = inject(ConfirmationService);
  permisoService = inject(PermisoService)
  trabajadorService = inject(TrabajadorService)

  usuarios$ = this.usuarioService.getUsuarios().pipe(
    map(users => users.map<UsuarioConPermiso>(user => {
      const permiso = this.permisoService.mapfromUsuario(user)!
      return {...user, ...permiso}
    }))
  )
  usuarioActual = this.authService.getCurrentUser()?.usuario


  crearNuevaCuenta() {
    this.router.navigate(['usuarios/registro'])
  }

  eliminarUsuario(event: Event, usuario: UsuarioConPermiso){
    this.confimService.confirm({
      target: event.target || new EventTarget(),
      message: `¿Estas segur@ de eliminar a ${usuario.username}`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuarioService.eliminarUsuario(usuario).pipe(finalize(() => {})).subscribe(() => this.trabajadorService.reload());
      },
  });
    
  }

}
