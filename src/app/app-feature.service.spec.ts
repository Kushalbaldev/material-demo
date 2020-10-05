import { TestBed } from '@angular/core/testing';

import { AppFeatureService } from './app-feature.service';

describe('AppFeatureService', () => {
  let service: AppFeatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppFeatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
