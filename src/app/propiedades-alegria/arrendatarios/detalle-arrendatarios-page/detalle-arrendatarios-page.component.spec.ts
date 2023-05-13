import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleArrendatariosPageComponent } from './detalle-arrendatarios-page.component';

describe('DetalleArrendatariosPageComponent', () => {
  let component: DetalleArrendatariosPageComponent;
  let fixture: ComponentFixture<DetalleArrendatariosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DetalleArrendatariosPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleArrendatariosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
