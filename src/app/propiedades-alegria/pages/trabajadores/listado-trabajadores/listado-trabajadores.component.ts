import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-listado-trabajadores',
  standalone: true,
  imports: [CommonModule, ToolbarModule, ButtonModule, TableModule, InputTextModule],
  templateUrl: './listado-trabajadores.component.html',
  styleUrls: ['./listado-trabajadores.component.scss']
})
export class ListadoTrabajadoresComponent {
  router = inject(Router)

  goToRegistroTrabajador() {
    this.router.navigate(['trabajadores/registro'])
  }

}
