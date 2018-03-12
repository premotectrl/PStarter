import { TestBed, inject } from '@angular/core/testing';

import { DeviceManagementService } from './device-management.service';

describe('DeviceManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceManagementService]
    });
  });

  it('should be created', inject([DeviceManagementService], (service: DeviceManagementService) => {
    expect(service).toBeTruthy();
  }));
});
