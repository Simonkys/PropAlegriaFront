import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPropietarioPageComponent } from './registro-propietario-page.component';

describe('RegistroPropietarioPageComponent', () => {
  let component: RegistroPropietarioPageComponent;
  let fixture: ComponentFixture<RegistroPropietarioPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RegistroPropietarioPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroPropietarioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
