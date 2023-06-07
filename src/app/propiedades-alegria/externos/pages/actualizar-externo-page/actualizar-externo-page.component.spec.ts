import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarExternoPageComponent } from './actualizar-externo-page.component';

describe('ActualizarExternoPageComponent', () => {
  let component: ActualizarExternoPageComponent;
  let fixture: ComponentFixture<ActualizarExternoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ActualizarExternoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarExternoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
