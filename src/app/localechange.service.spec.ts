import { TestBed } from '@angular/core/testing';

import { LocalechangeService } from './localechange.service';

describe('LocalechangeService', () => {
  let service: LocalechangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalechangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
