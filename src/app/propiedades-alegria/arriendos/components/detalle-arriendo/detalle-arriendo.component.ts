import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Arriendo } from '../../arriendo.model';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ValoresGlobalesService } from 'src/app/propiedades-alegria/valores-globales/valores-globales.service';
import { TagModule } from 'primeng/tag';
import { DetalleArriendo } from 'src/app/propiedades-alegria/core/models/detalle-arriendo.model';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { DetalleArriendoService } from 'src/app/propiedades-alegria/core/services/detalle-arriendo.service';


@Component({
  selector: 'app-detalle-arriendo',
  standalone: true,
  providers: [ConfirmationService],
  imports: [CommonModule, ButtonModule, ConfirmPopupModule, TagModule, TableModule],
  templateUrl: './detalle-arriendo.component.html',
  styleUrls: ['./detalle-arriendo.component.scss']
})
export class DetalleArriendoComponent implements OnInit {
  

  @Input() arriendo?: Arriendo

  @Output() eliminarEvent = new EventEmitter();
  @Output() actualizarEvent = new EventEmitter();

  router = inject(Router)
  detalleArriendoService = inject(DetalleArriendoService)
  confimService = inject(ConfirmationService)
  valoresGloablesService = inject(ValoresGlobalesService)
  ValidatorsGlobales = this.valoresGloablesService.getValorGlobalById(2)  

  ngOnInit(): void {}

  eliminar(event: Event) {
    this.confimService.confirm({
      target: event.target || new EventTarget(),
      message: `¿Estas segur@ de eliminar el arriendo`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eliminarEvent.emit()
      },
    });
  }


  actualizar() {
    this.actualizarEvent.emit()
  }

  registrarPago(detalleArr: DetalleArriendo) {
    if(detalleArr.monto_a_pagar) {
      this.router.navigate(['arrendatarios', 'registro-pago'], {state: {registroPago: detalleArr}})
    }
  }

  reajustar(detalleArr: DetalleArriendo) {
    this.detalleArriendoService.registrarDetalleArriendo({...detalleArr,monto_a_pagar: 300000 }).subscribe()
  }
}
