import { TestBed } from '@angular/core/testing';

import { ListaEmAbertosService } from './lista-em-abertos.service';

describe('ListaEmAbertosService', () => {
  let service: ListaEmAbertosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaEmAbertosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
