import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroArriendoPageComponent } from './registro-arriendo-page.component';

describe('RegistroArriendoPageComponent', () => {
  let component: RegistroArriendoPageComponent;
  let fixture: ComponentFixture<RegistroArriendoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RegistroArriendoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroArriendoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
