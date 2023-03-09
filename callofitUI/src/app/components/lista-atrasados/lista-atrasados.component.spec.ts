import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAtrasadosComponent } from './lista-atrasados.component';

describe('ListaAtrasadosComponent', () => {
  let component: ListaAtrasadosComponent;
  let fixture: ComponentFixture<ListaAtrasadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAtrasadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAtrasadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
