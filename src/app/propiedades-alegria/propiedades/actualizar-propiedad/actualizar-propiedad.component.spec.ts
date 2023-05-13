import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPropiedadComponent } from './actualizar-propiedad.component';

describe('ActualizarPropiedadComponent', () => {
  let component: ActualizarPropiedadComponent;
  let fixture: ComponentFixture<ActualizarPropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ActualizarPropiedadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
