import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPropiedadPageComponent } from './registro-propiedad-page.component';

describe('RegistroPropiedadPageComponent', () => {
  let component: RegistroPropiedadPageComponent;
  let fixture: ComponentFixture<RegistroPropiedadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RegistroPropiedadPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroPropiedadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
