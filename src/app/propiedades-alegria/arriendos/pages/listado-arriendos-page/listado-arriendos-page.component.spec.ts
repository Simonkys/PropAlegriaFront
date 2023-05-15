import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoArriendosPageComponent } from './listado-arriendos-page.component';

describe('ListadoArriendosPageComponent', () => {
  let component: ListadoArriendosPageComponent;
  let fixture: ComponentFixture<ListadoArriendosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ListadoArriendosPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoArriendosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
