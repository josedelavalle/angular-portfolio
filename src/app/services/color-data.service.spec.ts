import { TestBed, inject } from '@angular/core/testing';

import { ColorDataService } from './color-data.service';

describe('ColorDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColorDataService]
    });
  });

  it('should be created', inject([ColorDataService], (service: ColorDataService) => {
    expect(service).toBeTruthy();
  }));
});
