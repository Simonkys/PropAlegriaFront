import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { ServiciosExtra } from '../../servicios-extra.model';
import { ServiciosExtraService } from '../../servicios-extra.service';
import { Observable, Subscription } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ServiciosExtraFormComponent } from '../servicios-extra-form/servicios-extra-form.component';


@Component({
  selector: 'app-listado-servicios-extra',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, TooltipModule, TagModule, CalendarModule, ConfirmDialogModule],
  templateUrl: './listado-servicios-extra.component.html',
  styleUrls: ['./listado-servicios-extra.component.scss'],
  providers: [ConfirmationService, DialogService]
})
export class ListadoServiciosExtraComponent implements OnInit, OnDestroy {

  @Input() propiedadId?: number;

  servicioExtraService = inject(ServiciosExtraService)
  confirmationService = inject(ConfirmationService)
  dialogService = inject(DialogService)

  ref?: DynamicDialogRef
  serviciosExtra: ServiciosExtra[] = []
  sub?: Subscription

  ngOnInit(): void {
    this.getServiciosExtras()
  }

  getServiciosExtras() {
    if (this.propiedadId) {
      this.sub = this.servicioExtraService.getServiciosExtra({ propiedadId: this.propiedadId }).subscribe(data => {
        this.serviciosExtra = data
      })
    }
  }


  eliminarServicioExtra(servicioExtra: ServiciosExtra) {
    this.confirmationService.confirm({
      message: `¿Segur@ de eliminar el registro?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.servicioExtraService.eliminarServicioExtra(servicioExtra)
          .subscribe(() => {
            this.serviciosExtra = this.serviciosExtra.filter(s => s.id !== servicioExtra.id)
          })
      },
      key: 'eliminarServicioExtra'
    });
  }

  editarServicioExtra(servicioExtra: ServiciosExtra) {
    this.ref = this.dialogService.open(ServiciosExtraFormComponent ,{
      header: "Actualizar servicio",
      draggable: true,
      data: { servicioExtra: servicioExtra}
    })

    this.ref.onClose.subscribe((servicioExtraForm) => {
      if(servicioExtraForm) {
        this.servicioExtraService.actualizarServicioExtra(servicioExtraForm, servicioExtra.id).subscribe((servicioActualizado) => {
          this.serviciosExtra = this.serviciosExtra.map(s => s.id === servicioActualizado.id ? servicioActualizado : s)
        })
      }
    })
  }


  registrar(propiedadId: number) {
    this.ref = this.dialogService.open(ServiciosExtraFormComponent ,{
      header: "Registrar servicio",
      draggable: true,
      data: { propiedadId: propiedadId }
    })

    this.ref.onClose.subscribe((servicioExtraForm) => {
      if(servicioExtraForm) {
        this.servicioExtraService.crearServicioExtra(servicioExtraForm).subscribe((nuevoServicio) => {
          this.serviciosExtra = [nuevoServicio, ...this.serviciosExtra]
        })
      }
    })
  }

  ngOnDestroy(): void {
    if(this.ref){ this.ref?.destroy() }

    if(this.sub){ this.sub.unsubscribe() }
  }
  


}
