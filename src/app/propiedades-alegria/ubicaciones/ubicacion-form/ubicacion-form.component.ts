import { Component, Input, OnInit, Output, inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UbicacionService } from '../ubicacion.service';
import {  FormsModule } from '@angular/forms';
import { Comuna, Region } from '../ubicaciones.model';
import { DropdownModule } from 'primeng/dropdown';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-ubicacion-form',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule],
  templateUrl: './ubicacion-form.component.html',
  styleUrls: ['./ubicacion-form.component.scss']
})
export class UbicacionFormComponent implements OnInit {

  @Input() initialComunaId?: number;
  @Output() selectedComunaIdEvent = new EventEmitter<number | null>();
  

  ubicacionService = inject(UbicacionService);

  comunaActual: Comuna | null = null;
  regionActual: Region | null = null;
  regiones: Region[] = [];
  comunas: Comuna[] = [];


  ngOnInit(): void {
    this.ubicacionService.getRegiones().subscribe(regiones => this.regiones = regiones)
    if(this.initialComunaId) {
      
      this.ubicacionService.getComunaById(this.initialComunaId).pipe(
        switchMap((comuna) => {
          this.regionActual = this.regiones.find(r => r.id = comuna.reg_id)!
          return this.ubicacionService.getComunasByRegion(comuna.reg_id)
        })
      ).subscribe(comunas => {
        this.comunas = comunas;
        this.comunaActual = comunas.find(c => c.id === this.initialComunaId)!
      })
    }
  }


  handleRegionChanges(event: any) {
    console.log('handleRegionChanges')
    const region  = event.value as Region;
    this.regionActual = region;
    this.comunaActual = null;
    this.ubicacionService.getComunasByRegion(region.id).subscribe(comunas => this.comunas = comunas)
    this.selectedComunaIdEvent.emit(this.comunaActual)
  }

  handleComunaChanges(event: any) {
    const comuna = event.value as Comuna;
    this.selectedComunaIdEvent.emit(comuna.id)
  }



}