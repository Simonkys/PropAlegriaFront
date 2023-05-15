import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTrabajadorPageComponent } from './detalle-trabajador-page.component';

describe('DetalleTrabajadorPageComponent', () => {
  let component: DetalleTrabajadorPageComponent;
  let fixture: ComponentFixture<DetalleTrabajadorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DetalleTrabajadorPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleTrabajadorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
