import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarArrendatariosPageComponent } from './actualizar-arrendatarios-page.component';

describe('ActualizarArrendatariosPageComponent', () => {
  let component: ActualizarArrendatariosPageComponent;
  let fixture: ComponentFixture<ActualizarArrendatariosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ActualizarArrendatariosPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarArrendatariosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
