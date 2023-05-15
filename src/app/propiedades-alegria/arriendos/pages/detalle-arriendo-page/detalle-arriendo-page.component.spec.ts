import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleArriendoPageComponent } from './detalle-arriendo-page.component';

describe('DetalleArriendoPageComponent', () => {
  let component: DetalleArriendoPageComponent;
  let fixture: ComponentFixture<DetalleArriendoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DetalleArriendoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleArriendoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
