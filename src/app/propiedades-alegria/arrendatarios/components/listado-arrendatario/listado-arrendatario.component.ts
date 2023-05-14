import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Arrendatario } from '../../arrendatario.model';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-listado-arrendatario',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule, TableModule, TagModule],
  templateUrl: './listado-arrendatario.component.html',
  styleUrls: ['./listado-arrendatario.component.scss']
})
export class ListadoArrendatarioComponent {

  @Input() arrendatarios: Arrendatario[] = [];

}
