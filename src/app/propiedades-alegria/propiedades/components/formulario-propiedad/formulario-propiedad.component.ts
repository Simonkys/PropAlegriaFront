import { Component, EventEmitter, Inject, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ButtonModule } from 'primeng/button';
import { finalize } from 'rxjs';
import { UbicacionFormComponent } from 'src/app/propiedades-alegria/componentes/ubicacion-form/ubicacion-form.component';
import { Propiedad, PropiedadForm, RegistroPropiedadForm } from 'src/app/propiedades-alegria/propiedades/propiedad.model';
import { PropiedadesService } from 'src/app/propiedades-alegria/propiedades/propiedades.service';
import { TipoPropiedadesService } from 'src/app/propiedades-alegria/core/services/tipo-propiedades.service';
import { PropietarioService } from 'src/app/propiedades-alegria/propietarios/propietario.service';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';

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
    ButtonModule,
    InputSwitchModule,
    CheckboxModule,
    TooltipModule
  ],
  templateUrl: './formulario-propiedad.component.html',
  styleUrls: ['./formulario-propiedad.component.scss']
})
export class FormularioPropiedadComponent implements OnInit {
 

  @Input() propiedad?: Propiedad;
  @Input() propietarioId?: number;

  @Output() submitEvent = new EventEmitter<Propiedad>();
  @Output() cancelEvent = new EventEmitter<void>();


  DEPARTAMENTO = 1

  propiedadService = inject(PropiedadesService);
  tipoPropiedadesService = inject(TipoPropiedadesService);
  propietarioService = inject(PropietarioService);

  fb = inject(FormBuilder)

  tipoPropiedades$ = this.tipoPropiedadesService.getTipoPropiedades();
  propietarios$ = this.propietarioService.getPropietarios();

  form = this.fb.group({
    direccion_ppdd: this.fb.control<string>('', [Validators.required, Validators.maxLength(150)]),
    numero_ppdd: this.fb.control<number | null>(null, []),
    rol_ppdd: this.fb.control<string | null>(null, [Validators.maxLength(50)]),
    comuna_id: this.fb.control<number | null>(null, [Validators.required]),
    propietario_id: this.fb.control<number | null>(null, [Validators.required]),
    tipopropiedad_id: this.fb.control<number | null>(null, [Validators.required]),

    incluir_bodega: this.fb.nonNullable.control<boolean>(false, []),
    numero_bodega: this.fb.control<number | null>({value: null, disabled: true}, [],),
    bodega_independiente: this.fb.control<boolean>({value: false, disabled: true}, []),

    incluir_estacionamiento: this.fb.nonNullable.control<boolean>(false, []),
    numero_estacionamiento: this.fb.control<number | null>({value: null, disabled: true}, []),
    estacionamiento_independiente: this.fb.control<boolean>({value: false, disabled: true}, []),
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

    if(this.propietarioId) {
      this.form.patchValue({propietario_id: this.propietarioId})
      this.form.controls['propietario_id'].disable();
    }

    this.handleBodegaChanges()
    this.handleEstacionamientoChanges()   
  }

  submit() {
    if(this.form.invalid) return;

    if (this.propiedad) {
      this.actualizarPropiedad()
    } else {
      this.crearPropiedad()
    }

  }



  crearPropiedad() {
    const formValues = this.form.getRawValue();

    const bodega = formValues.incluir_bodega ? {
      numero_bodega: formValues.numero_bodega!,
      bodega_independiente: formValues.bodega_independiente!
    } : null

    const estacionamiento = formValues.incluir_estacionamiento ? {
      numero_estacionamiento: formValues.numero_estacionamiento!,
      estacionamiento_independiente: formValues.estacionamiento_independiente!
    } : null

    const registroPropiedadForm: RegistroPropiedadForm = {
      comuna: formValues.comuna_id!,
      direccion_ppdd: formValues.direccion_ppdd!,
      numero_ppdd: formValues.numero_ppdd,
      propietario: formValues.propietario_id!,
      rol_ppdd: formValues.rol_ppdd,
      tipopropiedad: formValues.tipopropiedad_id!,
      bodega: bodega,
      estacionamiento: estacionamiento
    }
    this.propiedadService.crearPropiedad(registroPropiedadForm)
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

  actualizarPropiedad() {
    const formValues = this.form.getRawValue();
    const propiedadForm: PropiedadForm = {
      comuna_id: formValues.comuna_id!,
      direccion_ppdd: formValues.direccion_ppdd!,
      numero_ppdd: formValues.numero_ppdd,
      propietario_id: formValues.propietario_id!,
      rol_ppdd: formValues.rol_ppdd,
      tipopropiedad_id: formValues.tipopropiedad_id!,
      id: this.propiedad?.id
    }

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

  handleBodegaChanges() {
    this.form.get('incluir_bodega')?.valueChanges.subscribe((incluyeBodega) => {
      if(incluyeBodega) {
        this.form.get('numero_bodega')?.reset()
        this.form.get('numero_bodega')?.setValidators([Validators.required, Validators.max(999999)])
        this.form.get('numero_bodega')?.updateValueAndValidity()
        this.form.get('numero_bodega')?.enable()
        this.form.get('bodega_independiente')?.enable()
      } else {
        this.form.get('numero_bodega')?.reset();
        this.form.get('numero_bodega')?.clearValidators();
        this.form.get('numero_bodega')?.updateValueAndValidity();
        this.form.get('numero_bodega')?.disable()
        this.form.get('bodega_independiente')?.disable()
      }
    })
  }

  handleEstacionamientoChanges() {
    this.form.get('incluir_estacionamiento')?.valueChanges.subscribe((incluirEstacionamiento) => {
      if(incluirEstacionamiento) {
        this.form.get('numero_estacionamiento')?.reset()
        this.form.get('numero_estacionamiento')?.setValidators([Validators.required, Validators.max(999999)])
        this.form.get('numero_estacionamiento')?.updateValueAndValidity()
        this.form.get('numero_estacionamiento')?.enable()
        this.form.get('estacionamiento_independiente')?.enable()
      } else {
        this.form.get('numero_estacionamiento')?.reset();
        this.form.get('numero_estacionamiento')?.clearValidators();
        this.form.get('numero_estacionamiento')?.updateValueAndValidity();
        this.form.get('numero_estacionamiento')?.disable()
        this.form.get('estacionamiento_independiente')?.disable()
      }
    })
  }
}
