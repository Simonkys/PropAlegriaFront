import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarTrabajadorComponent } from './actualizar-trabajador.component';

describe('ActualizarTrabajadorComponent', () => {
  let component: ActualizarTrabajadorComponent;
  let fixture: ComponentFixture<ActualizarTrabajadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ActualizarTrabajadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
