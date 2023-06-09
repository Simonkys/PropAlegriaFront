import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroServicioExtraPageComponent } from './registro-servicio-extra-page.component';

describe('RegistroServicioExtraPageComponent', () => {
  let component: RegistroServicioExtraPageComponent;
  let fixture: ComponentFixture<RegistroServicioExtraPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RegistroServicioExtraPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroServicioExtraPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
