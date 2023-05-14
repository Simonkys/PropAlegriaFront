import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroArrendatariosPageComponent } from './registro-arrendatarios-page.component';

describe('RegistroArrendatariosPageComponent', () => {
  let component: RegistroArrendatariosPageComponent;
  let fixture: ComponentFixture<RegistroArrendatariosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RegistroArrendatariosPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroArrendatariosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
