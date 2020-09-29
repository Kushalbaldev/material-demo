import { TestBed } from '@angular/core/testing';

import { SpellchekerService } from './spellcheker.service';

describe('SpellchekerService', () => {
  let service: SpellchekerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpellchekerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
