import { Component, EventEmitter, Inject, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ButtonModule } from 'primeng/button';
import { finalize } from 'rxjs';
import { UbicacionFormComponent } from 'src/app/propiedades-alegria/componentes/ubicacion-form/ubicacion-form.component';
import { Propiedad, PropiedadForm } from 'src/app/propiedades-alegria/propiedades/propiedad.model';
import { PropiedadesService } from 'src/app/propiedades-alegria/propiedades/propiedades.service';
import { TipoPropiedadesService } from 'src/app/propiedades-alegria/core/services/tipo-propiedades.service';
import { PropietarioService } from 'src/app/propiedades-alegria/propietarios/propietario.service';

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
 

  @Input() propiedad?: Propiedad;
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

    if(this.propiedad) {
      this.form.patchValue({
        direccion_ppdd: this.propiedad.direccion_ppdd,
        comuna_id: this.propiedad.comuna.id,
        numero_ppdd: this.propiedad.numero_ppdd,
        propietario_id: this.propiedad.propietario.id,
        rol_ppdd: this.propiedad.rol_ppdd,
        tipopropiedad_id: this.propiedad.tipopropiedad.id
      })
      this.form.controls['propietario_id'].disable();
    }
    else if(this.propietarioId) {
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

    if(this.propiedad) {
      this.actualizarPropiedad({...propiedadForm, id: this.propiedad.id})
    } else {
      this.crearPropiedad(propiedadForm)
    }
  }



  crearPropiedad(propiedadForm: PropiedadForm) {
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

  actualizarPropiedad(propiedadForm: PropiedadForm) {
    this.propiedadService.actualizarPropiedad(propiedadForm)
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
