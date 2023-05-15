import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPropiedadComponent } from './formulario-propiedad.component';

describe('FormularioPropiedadComponent', () => {
  let component: FormularioPropiedadComponent;
  let fixture: ComponentFixture<FormularioPropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormularioPropiedadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
