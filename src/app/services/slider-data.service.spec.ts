import { TestBed, inject } from '@angular/core/testing';

import { SliderDataService } from './slider-data.service';

describe('SliderDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SliderDataService]
    });
  });

  it('should be created', inject([SliderDataService], (service: SliderDataService) => {
    expect(service).toBeTruthy();
  }));
});
