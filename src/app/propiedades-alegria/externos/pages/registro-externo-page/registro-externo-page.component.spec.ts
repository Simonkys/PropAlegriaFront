import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroExternoPageComponent } from './registro-externo-page.component';

describe('RegistroExternoPageComponent', () => {
  let component: RegistroExternoPageComponent;
  let fixture: ComponentFixture<RegistroExternoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RegistroExternoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroExternoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
