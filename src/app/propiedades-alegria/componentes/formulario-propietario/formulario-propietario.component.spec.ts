import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPropietarioComponent } from './formulario-propietario.component';

describe('FormularioPropietarioComponent', () => {
  let component: FormularioPropietarioComponent;
  let fixture: ComponentFixture<FormularioPropietarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormularioPropietarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioPropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
