import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Propietario, PropietarioForm } from '../../propietario.model';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CheckboxModule } from 'primeng/checkbox';
import { UbicacionFormComponent } from '../../../componentes/ubicacion-form/ubicacion-form.component';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-formulario-propietario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UbicacionFormComponent,
    InputTextModule,
    ButtonModule,
    KeyFilterModule,
    CheckboxModule,
    InputNumberModule
  ],
  templateUrl: './formulario-propietario.component.html',
  styleUrls: ['./formulario-propietario.component.scss']
})
export class FormularioPropietarioComponent implements OnInit {

  @Input() propietario?: Propietario

  @Output() submitEvent = new EventEmitter<PropietarioForm>();
  @Output() cancelEvent = new EventEmitter<void>();

  fb = inject(FormBuilder)
  
  mostarFormularioPersonalidadJuridica: boolean = false

  form = this.fb.group({
    rut_prop: this.fb.nonNullable.control<string>('',
      [
        Validators.required,
        Validators.pattern(/^(\d{1,2}(?:\.\d{1,3}){2}-[\dkK])$/),
      ],
    ),

    pri_nom_prop: this.fb.nonNullable.control<string>('', [Validators.required, Validators.maxLength(50)]),
    seg_nom_prop: this.fb.control<string | null>(null, [Validators.maxLength(50)]),
    pri_ape_prop: this.fb.nonNullable.control<string>('', [Validators.required, Validators.maxLength(50)]),
    seg_ape_prop: this.fb.control<string | null>(null, [Validators.maxLength(50)]),

    direccion_prop: this.fb.nonNullable.control<string>('', [Validators.required, Validators.maxLength(200)]),
    email_prop: this.fb.nonNullable.control<string>('', [Validators.required, Validators.email]),
    contacto_prop: this.fb.nonNullable.control<number>(0, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15),
    ],),
    comuna_id: this.fb.control<number | null>(null, [Validators.required]),
    pctje_cobro_honorario: this.fb.nonNullable.control<number>(7, [Validators.required]), // Con decimales
    tiene_personalidad_juridica: this.fb.nonNullable.control<boolean>(false, [])
  })

  personalidadJuridicaForm = this.fb.group({
    rut: this.fb.nonNullable.control<string>('',
      [
        Validators.required,
        Validators.pattern(/^(\d{1,2}(?:\.\d{1,3}){2}-[\dkK])$/),
      ],
    ),
    razon_social: this.fb.nonNullable.control<string>('', [Validators.required, Validators.maxLength(250)]),
    direccion: this.fb.control<string | null>(null),
    email: this.fb.control<string | null>(null, [Validators.email]),
    contacto: this.fb.control<number | null>(null),
    comuna: this.fb.control<number | null>(null),
  })

  ngOnInit(): void {
    if(this.propietario) {

      this.form.patchValue({...this.propietario, comuna_id: this.propietario.comuna.id})

      if(this.propietario.personalidad_juridica) {

        this.form.patchValue({tiene_personalidad_juridica: true})
        this.personalidadJuridicaForm.patchValue({...this.propietario.personalidad_juridica})
        this.mostarFormularioPersonalidadJuridica = true
      }
    }

    this.handleTienePersonalidadJuridicaChanges()
  }

  handleSelectedComuna(comunaId: number | null) {
    this.form.patchValue({ comuna_id: comunaId })
  }

  handleSelectedComunaForPersonalidadJuridica(comunaId: number | null) {
    this.personalidadJuridicaForm.patchValue({comuna: comunaId})
  } 


  submit() {
    if(this.form.invalid) return;

    const {tiene_personalidad_juridica ,...values} = this.form.getRawValue()

    const propietarioForm: PropietarioForm = {
      ...values,
      id: this.propietario?.id,
      comuna_id: values.comuna_id!,
      personalidad_juridica: null,
    }
    
    if (tiene_personalidad_juridica == false) {
        this.submitEvent.emit(propietarioForm);
        return;
    }

    if(this.personalidadJuridicaForm.invalid) {
      return;
    };

    const personalidadJuridicaValues = this.personalidadJuridicaForm.getRawValue();
    propietarioForm.personalidad_juridica = {
      ...personalidadJuridicaValues, 
      id: this.propietario?.personalidad_juridica?.id,
      nom_com: this.propietario?.personalidad_juridica?.nom_com
    }

    
    this.submitEvent.emit(propietarioForm);
  }

  cancelar() {
    this.cancelEvent.emit();
  }

  handleTienePersonalidadJuridicaChanges() {
    this.form.get('tiene_personalidad_juridica')?.valueChanges.subscribe(value => {
      if(value) {
        this.mostarFormularioPersonalidadJuridica = true
      } else {
        this.mostarFormularioPersonalidadJuridica = false
      }
    })
  }

}
