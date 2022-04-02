import { Test, TestingModule } from '@nestjs/testing';
import { HealthCareService } from '../health-care.service';
import { HttpModule } from '@nestjs/axios';

describe('HealthCareService', () => {
  let healthCareService: HealthCareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          timeout: 5000,
          baseURL: 'http://49.50.167.136:9871/api',
        }),
      ],
      providers: [HealthCareService],
    }).compile();

    healthCareService = module.get(HealthCareService);
  });

  it('filter를 가져오는 테스트', async () => {
    const filters = await healthCareService.getFilters();
    expect(filters).toEqual({
      ethnicity: ['nonhispanic', 'hispanic'],
      gender: ['M', 'F'],
      race: ['other', 'native', 'black', 'white', 'asian'],
    });
  });
});
