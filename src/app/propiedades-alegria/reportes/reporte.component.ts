import { Component, inject } from "@angular/core";
import { ReporteeService } from "./reporte.service";
import { NgIf } from "@angular/common";

import { SelectorPropietariosComponent } from "../propietarios/components/selector-propietarios/selector-propietarios.component";
import { Propietario } from "../propietarios/propietario.model";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { FormsModule } from "@angular/forms";

@Component({
    imports: [NgIf, FormsModule, SelectorPropietariosComponent, ButtonModule, CalendarModule],
    standalone: true,
    styles: [],
    template: `

    <div class="card">
        <h4>Reporte de arriendos</h4>

        <div class="grid">
            <div class="col-4">
            
                <app-selector-propietarios 
                    (selectedEvent)="handlePropietarioSelected($event)"
                />
                
            </div>
            <div class="col-2">
                <div class=p-float-label>
                    <p-calendar
                        view="year"
                        dateFormat="yy"
                        [readonlyInput]="true"
                        inputId="pickYear"
                        [(ngModel)]="dateSelected"
                        [style]="{width: '100%'}"
                        placeholder="Seleccione un año">
                    </p-calendar>
                    <label>Año</label>
                </div>
            </div>
        </div>
    
        <button pButton [disabled]="!this.propietarioSeleccionado" (click)="generarReporte()">Generar Reporte</button>
    </div>
`,
})
export class ReporteComponent {

    reporteService = inject(ReporteeService);

    propietarioSeleccionado: Propietario | null = null;

    dateSelected: Date = new Date();


    generarReporte() {
        if(this.propietarioSeleccionado) {
            this.reporteService.getReporteArriendos( { propietario: this.propietarioSeleccionado.id, year: this.dateSelected.getFullYear() })
                .subscribe(response => {
                    const blob = new Blob([response], { type: 'application/pdf' });
                    const pdfUrl = URL.createObjectURL(blob);
                    window.open(pdfUrl);
            })
        }
        
    }


    handlePropietarioSelected(propietario: Propietario) {
        this.propietarioSeleccionado = propietario;
    }


}