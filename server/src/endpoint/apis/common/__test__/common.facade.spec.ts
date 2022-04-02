import { Test, TestingModule } from '@nestjs/testing';
import { CommonFacade } from '../common.facade';
import { HealthCareService } from '../../../../modules/healthcare/health-care.service';

describe('HealthCareService', () => {
  let healthCareService: HealthCareService;
  let commonFacade: CommonFacade;

  beforeEach(() => {
    healthCareService = jest.fn() as any;
    commonFacade = new CommonFacade(healthCareService);
  });
});
