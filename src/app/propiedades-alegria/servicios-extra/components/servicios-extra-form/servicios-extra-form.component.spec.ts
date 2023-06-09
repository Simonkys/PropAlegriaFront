import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosExtraFormComponent } from './servicios-extra-form.component';

describe('ServiciosExtraFormComponent', () => {
  let component: ServiciosExtraFormComponent;
  let fixture: ComponentFixture<ServiciosExtraFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ServiciosExtraFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosExtraFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
