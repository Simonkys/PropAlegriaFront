import { Component, EventEmitter, Inject, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropiedadesService } from '../../core/services/propiedades.service';
import { Propiedad, PropiedadForm } from '../../core/models/propiedad.model';
import { TipoPropiedadesService } from '../../core/services/tipo-propiedades.service';
import { UbicacionFormComponent } from '../../ubicaciones/ubicacion-form/ubicacion-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ButtonModule } from 'primeng/button';
import { PropietarioService } from '../../core/services/propietario.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-formulario-propiedad',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    UbicacionFormComponent, 
    InputTextModule,
    DropdownModule,
    KeyFilterModule,
    ButtonModule
  ],
  templateUrl: './formulario-propiedad.component.html',
  styleUrls: ['./formulario-propiedad.component.scss']
})
export class FormularioPropiedadComponent implements OnInit {
 

  @Input() propiedadId?: number;
  @Input() propietarioId?: number;

  @Output() submitEvent = new EventEmitter<Propiedad>();
  @Output() cancelEvent = new EventEmitter<void>();

  propiedadService = inject(PropiedadesService);
  tipoPropiedadesService = inject(TipoPropiedadesService);
  propietarioService = inject(PropietarioService);

  fb = inject(FormBuilder)

  tipoPropiedades$ = this.tipoPropiedadesService.getTipoPropiedades();
  propietarios$ = this.propietarioService.getPropietarios();

  form = this.fb.group({
    direccion_ppdd: this.fb.control<string>('', [Validators.required]),
    numero_ppdd: this.fb.control<number | null>(null, []),
    rol_ppdd: this.fb.control<string | null>(null, []),
    comuna_id: this.fb.control<number | null>(null, [Validators.required]),
    propietario_id: this.fb.control<number | null>(null, [Validators.required]),
    tipopropiedad_id: this.fb.control<number | null>(null, [Validators.required]),
  })

  ngOnInit() {
    if(this.propietarioId) {
      this.form.patchValue({propietario_id: this.propietarioId})
      this.form.controls['propietario_id'].disable();
    }
  }

  submit() {
    if(this.form.invalid) return;

    const formValues = this.form.getRawValue();

    const propiedadForm: PropiedadForm = {
      direccion_ppdd: formValues.direccion_ppdd!,
      numero_ppdd: formValues.numero_ppdd,
      rol_ppdd: formValues.rol_ppdd,
      comuna_id: formValues.comuna_id!,
      propietario_id: formValues.propietario_id!,
      tipopropiedad_id: formValues.tipopropiedad_id!
    }

    this.propiedadService.crearPropiedad(propiedadForm)
      .pipe(
        finalize(() => { })
      )
      .subscribe({
        next: (response) => {
          this.form.reset();
          this.submitEvent.emit(response);
        },
        error: (err) => {}
      })
  }

  handleSelectedComuna(comunaId: number | null) {
    this.form.patchValue({ comuna_id: comunaId })
  }


  cancel() {
    this.form.reset();
    this.cancelEvent.emit();
  }
}
