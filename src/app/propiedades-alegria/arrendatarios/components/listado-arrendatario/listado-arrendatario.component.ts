import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Arrendatario } from '../../arrendatario.model';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-listado-arrendatario',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule, TableModule, TagModule, InputTextModule],
  templateUrl: './listado-arrendatario.component.html',
  styleUrls: ['./listado-arrendatario.component.scss']
})
export class ListadoArrendatarioComponent {

  @Input() arrendatarios: Arrendatario[] = [];


  filterFields: string[] = ['rut_arr', 'pri_nom_arr', 'pri_ape_arr']

  clear(table: Table) {
    table.clear();
  }

}
