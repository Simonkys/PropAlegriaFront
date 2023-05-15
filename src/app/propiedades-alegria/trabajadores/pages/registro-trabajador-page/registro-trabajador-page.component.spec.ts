import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroTrabajadorPageComponent } from './registro-trabajador-page.component';

describe('RegistroTrabajadorPageComponent', () => {
  let component: RegistroTrabajadorPageComponent;
  let fixture: ComponentFixture<RegistroTrabajadorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RegistroTrabajadorPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroTrabajadorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
