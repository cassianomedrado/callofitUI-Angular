import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEmAbertosComponent } from './lista-em-abertos.component';

describe('ListaEmAbertosComponent', () => {
  let component: ListaEmAbertosComponent;
  let fixture: ComponentFixture<ListaEmAbertosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaEmAbertosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaEmAbertosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
