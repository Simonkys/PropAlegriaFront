import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPropietarioPageComponent } from './actualizar-propietario-page.component';

describe('ActualizarPropietarioPageComponent', () => {
  let component: ActualizarPropietarioPageComponent;
  let fixture: ComponentFixture<ActualizarPropietarioPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ActualizarPropietarioPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarPropietarioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
