import { TestBed } from '@angular/core/testing';

import { ListaPendentesService } from './lista-pendentes.service';

describe('ListaPendentesService', () => {
  let service: ListaPendentesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaPendentesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
