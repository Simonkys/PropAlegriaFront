import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { UbicacionFormComponent } from 'src/app/propiedades-alegria/componentes/ubicacion-form/ubicacion-form.component';
import { Propiedad, PropiedadForm } from 'src/app/propiedades-alegria/propiedades/propiedad.model';
import { PropiedadesService } from 'src/app/propiedades-alegria/propiedades/propiedades.service';
import { TipoPropiedadesService } from 'src/app/propiedades-alegria/core/services/tipo-propiedades.service';
import { PropietarioService } from 'src/app/propiedades-alegria/propietarios/propietario.service';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TipoPropiedadEnum } from 'src/app/propiedades-alegria/core/models/tipo-propiedad.model';

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
  ],
  templateUrl: './formulario-propiedad.component.html',
  styleUrls: ['./formulario-propiedad.component.scss']
})
export class FormularioPropiedadComponent implements OnInit {
 

  @Input() propiedad?: Propiedad;
  @Input() propietarioId?: number;
  @Input() codigoPropiedad!: number;

  @Output() submitEvent = new EventEmitter<Propiedad>();
  @Output() cancelEvent = new EventEmitter<void>();

  

  propiedadService = inject(PropiedadesService);
  tipoPropiedadesService = inject(TipoPropiedadesService);
  propietarioService = inject(PropietarioService);

  fb = inject(FormBuilder)

  TipoPropiedadEnum = TipoPropiedadEnum

  tipoPropiedades$ = this.tipoPropiedadesService.getTipoPropiedades();
  propietarios$ = this.propietarioService.getPropietarios();

  form = this.fb.group({
    direccion_ppdd: this.fb.nonNullable.control<string>('', [Validators.required, Validators.maxLength(150)]),
    numero_ppdd: this.fb.control<string | null>(null, [Validators.maxLength(50)]),
    rol_ppdd: this.fb.control<string | null>(null, [Validators.maxLength(50)]),

    comuna_id: this.fb.control<number | null>(null, [Validators.required]),
    propietario_id: this.fb.control<number | null>(null, [Validators.required]),
    tipopropiedad_id: this.fb.control<number | null>(null, [Validators.required]),

    cod: this.fb.control<number | null>({value: null, disabled: true}, []),

    nro_bodega: this.fb.control<number | null>({value: null, disabled: true}, [],),
    nro_estacionamiento: this.fb.control<number | null>({value: null, disabled: true}, []),

    valor_arriendo_base: this.fb.nonNullable.control<number>(0, [Validators.required]),
    es_valor_uf: this.fb.nonNullable.control<boolean>(false, []),

    gas: this.fb.control<string | null>(null),
    agua: this.fb.control<string | null>(null),
    luz: this.fb.control<string | null>(null),

    incluye_gc: this.fb.nonNullable.control<boolean>(false, []),
    valor_gasto_comun: this.fb.nonNullable.control<number>(0, []),

    incluir_bodega: this.fb.nonNullable.control<boolean>(false, []),
    incluir_estacionamiento: this.fb.nonNullable.control<boolean>(false, []),

    observaciones: this.fb.control<string | null>(null, [])
  })

  ngOnInit() {

    if(this.propiedad) {
      this.form.patchValue({
        direccion_ppdd: this.propiedad.direccion_ppdd,
        numero_ppdd: this.propiedad.numero_ppdd,
        rol_ppdd: this.propiedad.rol_ppdd,

        comuna_id: this.propiedad.comuna.id,
        propietario_id: this.propiedad.propietario.id,
        tipopropiedad_id: this.propiedad.tipopropiedad.id,

        cod: this.propiedad.cod,

        nro_bodega: this.propiedad.nro_bodega,
        nro_estacionamiento: this.propiedad.nro_estacionamiento,

        incluir_bodega: !!this.propiedad.nro_bodega,
        incluir_estacionamiento: !!this.propiedad.nro_estacionamiento,

        gas: this.propiedad.gas,
        agua: this.propiedad.agua,
        luz: this.propiedad.luz,

        valor_arriendo_base: this.propiedad.valor_arriendo_base,
        es_valor_uf: this.propiedad.es_valor_uf,

        incluye_gc: this.propiedad.incluye_gc,
        valor_gasto_comun: this.propiedad.valor_gasto_comun,

        observaciones: this.propiedad.observaciones
      })
      this.form.controls['propietario_id'].disable();
    } else {
      this.form.patchValue({cod: this.codigoPropiedad})
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

    const formValues = this.form.getRawValue();

    const nro_bodega = formValues.incluir_bodega && formValues.tipopropiedad_id === TipoPropiedadEnum.DEPARTAMENTO
      ? formValues.nro_bodega : null

    const nro_estacionamiento = formValues.incluir_estacionamiento && formValues.tipopropiedad_id === TipoPropiedadEnum.DEPARTAMENTO
    ? formValues.nro_estacionamiento : null

    const propiedadForm: PropiedadForm = {
      id: this.propiedad?.id,

      direccion_ppdd: formValues.direccion_ppdd,
      numero_ppdd: formValues.numero_ppdd,
      rol_ppdd: formValues.rol_ppdd,

      comuna_id: formValues.comuna_id!,
      tipopropiedad_id: formValues.tipopropiedad_id!,
      propietario_id: formValues.propietario_id!,

      cod: formValues.cod,

      nro_bodega: nro_bodega,
      nro_estacionamiento: nro_estacionamiento,

      valor_arriendo_base: formValues.valor_arriendo_base,
      es_valor_uf: formValues.es_valor_uf,

      gas: formValues.gas,
      agua: formValues.agua,
      luz: formValues.luz,

      incluye_gc: formValues.incluye_gc,
      valor_gasto_comun: formValues.valor_gasto_comun,

      observaciones: formValues.observaciones
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
    this.form.get('tipopropiedad_id')?.valueChanges.subscribe(
      (tipoId) => {
        if( tipoId !== TipoPropiedadEnum.DEPARTAMENTO) {
          this.invalidateEstacionamiento()
          this.invalidateBodega()
         
        } else {
          this.validateBodega()
          this.validateEstacionamiento()
        }
      }
    )
    
  }

  handleBodegaChanges() {
    this.form.get('incluir_bodega')?.valueChanges.subscribe((incluyeBodega) => {
      if(incluyeBodega) {
        this.validateBodega()
        this.form.get('nro_bodega')?.enable()
      } else {
        this.invalidateBodega()
        this.form.get('nro_bodega')?.disable()
      }
    })
  }


  handleEstacionamientoChanges() {
    this.form.get('incluir_estacionamiento')?.valueChanges.subscribe((incluirEstacionamiento) => {
      if(incluirEstacionamiento) {
        this.validateEstacionamiento()
        this.form.get('nro_estacionamiento')?.enable()
      } else {
        this.invalidateEstacionamiento()
        this.form.get('nro_estacionamiento')?.disable()
      }
    })
  }



  validateBodega() {
    this.form.get('nro_bodega')?.setValidators([Validators.required, Validators.max(999999)])
    this.form.get('nro_bodega')?.updateValueAndValidity()    
  }

  invalidateBodega() {
    this.form.get('nro_bodega')?.clearValidators()
    this.form.get('nro_bodega')?.updateValueAndValidity()
  }

  validateEstacionamiento() {
    this.form.get('nro_estacionamiento')?.setValidators([Validators.required, Validators.max(999999)])
    this.form.get('nro_estacionamiento')?.updateValueAndValidity()
  }

  invalidateEstacionamiento() {
    this.form.get('nro_estacionamiento')?.clearValidators()
    this.form.get('nro_estacionamiento')?.updateValueAndValidity()
    
  } 

}
