import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePropiedadPageComponent } from './detalle-propiedad-page.component';

describe('DetallePropiedadPageComponent', () => {
  let component: DetallePropiedadPageComponent;
  let fixture: ComponentFixture<DetallePropiedadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DetallePropiedadPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallePropiedadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
