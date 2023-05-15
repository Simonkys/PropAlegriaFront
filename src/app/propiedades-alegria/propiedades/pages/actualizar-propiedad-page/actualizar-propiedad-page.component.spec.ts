import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPropiedadPageComponent } from './actualizar-propiedad-page.component';

describe('ActualizarPropiedadPageComponent', () => {
  let component: ActualizarPropiedadPageComponent;
  let fixture: ComponentFixture<ActualizarPropiedadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ActualizarPropiedadPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarPropiedadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
