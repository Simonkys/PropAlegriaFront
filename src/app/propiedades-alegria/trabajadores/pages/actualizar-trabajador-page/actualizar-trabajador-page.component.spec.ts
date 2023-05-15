import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarTrabajadorPageComponent } from './actualizar-trabajador-page.component';

describe('ActualizarTrabajadorPageComponent', () => {
  let component: ActualizarTrabajadorPageComponent;
  let fixture: ComponentFixture<ActualizarTrabajadorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ActualizarTrabajadorPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarTrabajadorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
