import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarServicioExtraPageComponent } from './actualizar-servicio-extra-page.component';

describe('ActualizarServicioExtraPageComponent', () => {
  let component: ActualizarServicioExtraPageComponent;
  let fixture: ComponentFixture<ActualizarServicioExtraPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ActualizarServicioExtraPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarServicioExtraPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
