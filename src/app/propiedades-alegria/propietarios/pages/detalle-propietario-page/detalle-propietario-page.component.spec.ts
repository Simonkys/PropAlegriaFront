import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePropietarioPageComponent } from './detalle-propietario-page.component';

describe('DetallePropietarioPageComponent', () => {
  let component: DetallePropietarioPageComponent;
  let fixture: ComponentFixture<DetallePropietarioPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DetallePropietarioPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallePropietarioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
