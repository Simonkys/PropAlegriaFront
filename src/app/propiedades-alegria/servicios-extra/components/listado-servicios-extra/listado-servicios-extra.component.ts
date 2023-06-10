import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { ServiciosExtra } from '../../servicios-extra.model';
import { ServiciosExtraService } from '../../servicios-extra.service';
import { Observable } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { CalendarModule } from 'primeng/calendar';


@Component({
  selector: 'app-listado-servicios-extra',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, TooltipModule, ConfirmPopupModule, TagModule, CalendarModule],
  templateUrl: './listado-servicios-extra.component.html',
  styleUrls: ['./listado-servicios-extra.component.scss'],
  providers: [ConfirmationService]
})
export class ListadoServiciosExtraComponent implements OnInit {


  @Input() propiedadId?: number;
  @Output() registrarEvent = new EventEmitter()

  servicioExtraService = inject(ServiciosExtraService);
  confirmationService = inject(ConfirmationService)

  serviciosExtra$?: Observable<ServiciosExtra[]>;

  ngOnInit(): void {
    this.getServiciosExtras()
  }

  getServiciosExtras() {
    if (this.propiedadId) {
      this.serviciosExtra$ = this.servicioExtraService.getServiciosExtra({ propiedadId: this.propiedadId })
      
    }
  }

  marcarCuotaPagada(servicioExtra: ServiciosExtra, event: Event) {
  
    if (!servicioExtra.pagado) {
      
      this.confirmationService.confirm({
        target:  event.target || new EventTarget(),
        message: '¿Desea confirmar la operación?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.servicioExtraService.actualizarServicioExtra({...servicioExtra, contador_cuotas: servicioExtra.contador_cuotas + 1})
            .subscribe(() => {
              this.getServiciosExtras()
            })
        },
      });
    }
  }


  registrar() {
    this.registrarEvent.emit()
  }

  filterDate(event: any) {
    console.log(event)
  }


}
