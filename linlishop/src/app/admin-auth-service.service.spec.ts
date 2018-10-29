import { TestBed } from '@angular/core/testing';

import { AdminAuthService } from './admin-auth-service.service';

describe('AdminAuthServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminAuthService = TestBed.get(AdminAuthService);
    expect(service).toBeTruthy();
  });
});
