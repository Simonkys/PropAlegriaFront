import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReajustarValorArriendoModalComponent } from './reajustar-valor-arriendo-modal.component';

describe('ReajustarValorArriendoModalComponent', () => {
  let component: ReajustarValorArriendoModalComponent;
  let fixture: ComponentFixture<ReajustarValorArriendoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReajustarValorArriendoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReajustarValorArriendoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
