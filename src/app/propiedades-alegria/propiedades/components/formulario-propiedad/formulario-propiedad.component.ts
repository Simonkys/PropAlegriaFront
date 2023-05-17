import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ButtonModule } from 'primeng/button';
import { UbicacionFormComponent } from 'src/app/propiedades-alegria/componentes/ubicacion-form/ubicacion-form.component';
import { Propiedad, PropiedadForm } from 'src/app/propiedades-alegria/propiedades/propiedad.model';
import { PropiedadesService } from 'src/app/propiedades-alegria/propiedades/propiedades.service';
import { TipoPropiedadesService } from 'src/app/propiedades-alegria/core/services/tipo-propiedades.service';
import { PropietarioService } from 'src/app/propiedades-alegria/propietarios/propietario.service';
import { InputSwitchModule } from 'primeng/inputswitch';

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

    incluir_estacionamiento: this.fb.nonNullable.control<boolean>(false, []),
    numero_estacionamiento: this.fb.control<number | null>({value: null, disabled: true}, []),
  })

  ngOnInit() {

    if(this.propiedad) {
      this.form.patchValue({
        direccion_ppdd: this.propiedad.direccion_ppdd,
        comuna_id: this.propiedad.comuna.id,
        numero_ppdd: this.propiedad.numero_ppdd,
        propietario_id: this.propiedad.propietario.id,
        rol_ppdd: this.propiedad.rol_ppdd,
        tipopropiedad_id: this.propiedad.tipopropiedad.id,
        numero_bodega: this.propiedad.nro_bodega,
        numero_estacionamiento: this.propiedad.nro_estacionamiento,
        incluir_bodega: !!this.propiedad.nro_bodega,
        incluir_estacionamiento: !!this.propiedad.nro_estacionamiento
      })
      this.form.controls['propietario_id'].disable();
    }

    if(this.propietarioId) {
      this.form.patchValue({propietario_id: this.propietarioId})
      this.form.controls['propietario_id'].disable();
    }

    
    this.handleTipoPropiedadChanges()
    this.handleBodegaChanges()
    this.handleEstacionamientoChanges()   
  }

  submit() {
    if(this.form.invalid) return;

    const formValues = this.form.getRawValue();

    const nro_bodega = formValues.incluir_bodega && formValues.tipopropiedad_id === this.DEPARTAMENTO
      ? formValues.numero_bodega : null

    const nro_estacionamiento = formValues.incluir_estacionamiento && formValues.tipopropiedad_id === this.DEPARTAMENTO
    ? formValues.numero_estacionamiento : null

    const propiedadForm: PropiedadForm = {
      comuna_id: formValues.comuna_id!,
      direccion_ppdd: formValues.direccion_ppdd!,
      numero_ppdd: formValues.numero_ppdd,
      propietario_id: formValues.propietario_id!,
      rol_ppdd: formValues.rol_ppdd,
      tipopropiedad_id: formValues.tipopropiedad_id!,
      nro_bodega: nro_bodega,
      nro_estacionamiento: nro_estacionamiento,
      id: this.propiedad?.id
    }

    if (this.propiedad) {
      this.actualizarPropiedad(propiedadForm)
    } else {
      this.crearPropiedad(propiedadForm)
    }

  }


  crearPropiedad(propiedadForm: PropiedadForm) {
    this.propiedadService.crearPropiedad(propiedadForm)
      .subscribe((response) => this.submitEvent.emit(response))
  }

  actualizarPropiedad(propiedadForm: PropiedadForm) {
    this.propiedadService.actualizarPropiedad(propiedadForm)
      .subscribe((response) => this.submitEvent.emit(response))
  }


  handleSelectedComuna(comunaId: number | null) {
    this.form.patchValue({ comuna_id: comunaId })
  }


  cancel() { this.cancelEvent.emit() }

  handleTipoPropiedadChanges() {
    this.form.get('tipopropiedad_id')?.valueChanges
      .subscribe((tipoId) => {  
        if( tipoId !== this.DEPARTAMENTO) {
          this.invalidateEstacionamiento()
          this.invalidateBodega()
        } else {
          this.validateBodega()
          this.validateEstacionamiento()
        }
        
    })
  }

  handleBodegaChanges() {
    this.form.get('incluir_bodega')?.valueChanges.subscribe((incluyeBodega) => {
      if(incluyeBodega) {
        this.validateBodega()
        this.form.get('numero_bodega')?.enable()
      } else {
        this.invalidateBodega()
        this.form.get('numero_bodega')?.disable()
      }
    })
  }


  handleEstacionamientoChanges() {
    this.form.get('incluir_estacionamiento')?.valueChanges.subscribe((incluirEstacionamiento) => {
      if(incluirEstacionamiento) {
        this.validateEstacionamiento()
        this.form.get('numero_estacionamiento')?.enable()
      } else {
        this.invalidateEstacionamiento()
        this.form.get('numero_estacionamiento')?.disable()
      }
    })
  }

  validateBodega() {
    this.form.get('numero_bodega')?.setValidators([Validators.required, Validators.max(999999)])
    this.form.get('numero_bodega')?.updateValueAndValidity()    
  }

  invalidateBodega() {
    this.form.get('numero_bodega')?.clearValidators()
    this.form.get('numero_bodega')?.updateValueAndValidity()
  }

  validateEstacionamiento() {
    this.form.get('numero_estacionamiento')?.setValidators([Validators.required, Validators.max(999999)])
    this.form.get('numero_estacionamiento')?.updateValueAndValidity()
  }

  invalidateEstacionamiento() {
    this.form.get('numero_estacionamiento')?.clearValidators()
    this.form.get('numero_estacionamiento')?.updateValueAndValidity()
    
  }


}
