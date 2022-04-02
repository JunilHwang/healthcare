import { Test, TestingModule } from '@nestjs/testing';
import { HealthCareService } from '../health-care.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { CacheModule } from '@nestjs/common';

describe('HealthCareService', () => {
  let healthCareService: HealthCareService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register(),
        HttpModule.register({
          timeout: 5000,
          baseURL: 'http://49.50.167.136:9871/api',
        }),
      ],
      providers: [HealthCareService],
    }).compile();

    healthCareService = module.get(HealthCareService);
    Object.assign(healthCareService);
    await healthCareService.initData();
  });

  it('성별 목록을 가져옴', async () => {
    const results = jest.fn().mockResolvedValue({
      genderList: ['남자', '여자'],
    });

    const result = await healthCareService.getGenders();
    expect(result).toHaveProperty('genderList');
  });

  it('민족 목록을 가져옴', async () => {
    const result = await healthCareService.getEthnicities();
    expect(result).toHaveProperty('ethnicityList');
  });

  it('인종 목록을 가져옴', async () => {
    const result = await healthCareService.getRace();
    expect(result).toHaveProperty('raceList');
  });

  it('환자 목록을 가져옴', async () => {
    const result = await healthCareService.getPatients();
    expect(result).toHaveProperty('patient');
  });

  it('환자의 상세정보의 요약정보를 가져옴', async () => {
    const { patient } = await healthCareService.getPatients();
    const result = await healthCareService.getPatientBrief(
      patient.list[0].personID,
    );
    expect(result).toHaveProperty('conditionList');
    expect(result).toHaveProperty('visitCount');
  });
});
