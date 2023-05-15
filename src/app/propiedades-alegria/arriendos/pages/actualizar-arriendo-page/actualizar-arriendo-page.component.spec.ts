import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarArriendoPageComponent } from './actualizar-arriendo-page.component';

describe('ActualizarArriendoPageComponent', () => {
  let component: ActualizarArriendoPageComponent;
  let fixture: ComponentFixture<ActualizarArriendoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ActualizarArriendoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarArriendoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
