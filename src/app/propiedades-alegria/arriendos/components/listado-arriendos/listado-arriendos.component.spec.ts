import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoArriendosComponent } from './listado-arriendos.component';

describe('ListadoArriendosComponent', () => {
  let component: ListadoArriendosComponent;
  let fixture: ComponentFixture<ListadoArriendosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ListadoArriendosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoArriendosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
