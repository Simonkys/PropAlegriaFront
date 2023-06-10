import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
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
import { AccordionModule } from 'primeng/accordion';


import { DetalleArriendoService } from 'src/app/propiedades-alegria/core/services/detalle-arriendo.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReajustarValorArriendoModalComponent } from 'src/app/propiedades-alegria/componentes/reajustar-valor-arriendo-modal/reajustar-valor-arriendo-modal.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-detalle-arriendo',
  standalone: true,
  providers: [ConfirmationService, DialogService],
  imports: [
    CommonModule, 
    ButtonModule, 
    ConfirmPopupModule, 
    TagModule, 
    TableModule,
    AccordionModule
],
  templateUrl: './detalle-arriendo.component.html',
  styleUrls: ['./detalle-arriendo.component.scss']
})
export class DetalleArriendoComponent implements OnInit, OnDestroy {
  

  @Input() arriendo!: Arriendo
  
  @Output() eliminarEvent = new EventEmitter();
  @Output() actualizarEvent = new EventEmitter();
  
  router = inject(Router)
  detalleArriendoService = inject(DetalleArriendoService)
  confimService = inject(ConfirmationService)
  valoresGloablesService = inject(ValoresGlobalesService)
  dialogService = inject(DialogService);
  
  
  
  ref?: DynamicDialogRef;
  ValidatorsGlobales$ = this.valoresGloablesService.getValorGlobalById(2)

  detalleArriendos$?: Observable<DetalleArriendo[]>;


  ngOnInit(): void {
    this.getDetalleArriendos()
  }

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

  abrirModalReajuste(detalleArr: DetalleArriendo) {
    this.ref = this.dialogService.open(ReajustarValorArriendoModalComponent, {
        header: 'Reajustar',
        width: '50%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        draggable: true
    })

    this.ref.onClose.subscribe(nuevoValoreArriendo => {
      if(nuevoValoreArriendo) {
        this.detalleArriendoService.registrarDetalleArriendo({...detalleArr, monto_a_pagar: nuevoValoreArriendo })
          .subscribe(() => {
            this.getDetalleArriendos()
          })
      }
    })
  }

  getDetalleArriendos() {
    if(this.arriendo){
      this.detalleArriendos$ = this.detalleArriendoService.getDetallesArriendo({arriendo: this.arriendo.id})
    }
  }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }




}
