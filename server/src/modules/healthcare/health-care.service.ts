import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  EthnicityResponse,
  GendersResponse,
  PatientBriefResponse,
  PatientResponse,
  RaceResponse,
} from '@healthcare/domain';
import { lastValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';
import { Cron, CronExpression } from '@nestjs/schedule';

const CACHE_PREFIX = 'HealthCareService';

@Injectable()
export class HealthCareService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  private async _getEthnicities() {
    const response = await lastValueFrom(
      this.httpService.get<EthnicityResponse>('/ethnicity/list'),
    );

    return response.data;
  }

  public getEthnicities() {
    return this.cacheManager.get<EthnicityResponse>(
      `${CACHE_PREFIX}.getEthnicities`,
    );
  }

  private async initEthnicities() {
    try {
      const result = await this._getEthnicities();
      await this.cacheManager.set(`${CACHE_PREFIX}.getEthnicities`, result, {
        ttl: Infinity,
      });
    } catch (e) {
      console.error('민족 리스트를 가져오는 과정에서 오류가 발생했습니다.', e);
    }
  }

  private async _getRace() {
    const response = await lastValueFrom(
      this.httpService.get<RaceResponse>('/race/list'),
    );

    return response.data;
  }

  public getRace() {
    return this.cacheManager.get<RaceResponse>(`${CACHE_PREFIX}.getRace`);
  }

  private async initRace() {
    try {
      const result = await this._getRace();
      await this.cacheManager.set(`${CACHE_PREFIX}.getRace`, result, {
        ttl: Infinity,
      });
    } catch (e) {
      console.error('인종 리스트를 가져오는 과정에서 오류가 발생했습니다.', e);
    }
  }

  private async _getGenders() {
    const response = await lastValueFrom(
      this.httpService.get<GendersResponse>('/gender/list'),
    );

    return response.data;
  }

  public getGenders() {
    return this.cacheManager.get<GendersResponse>(`${CACHE_PREFIX}.getGenders`);
  }

  private async initGenders() {
    try {
      const result = await this._getGenders();
      await this.cacheManager.set(`${CACHE_PREFIX}.getGenders`, result, {
        ttl: Infinity,
      });
    } catch (e) {
      console.error('성별 리스트를 가져오는 과정에서 오류가 발생했습니다.', e);
    }
  }

  private async _getPatients() {
    const response = await lastValueFrom(
      this.httpService.get<PatientResponse>('/patient/list'),
    );

    return response.data;
  }

  public getPatients() {
    return this.cacheManager.get<PatientResponse>(
      `${CACHE_PREFIX}.getPatients`,
    );
  }

  private async initPatients() {
    try {
      const result = await this._getPatients();
      await this.cacheManager.set(`${CACHE_PREFIX}.getPatients`, result, {
        ttl: Infinity,
      });

      const { patient } = result;
      await Promise.all(
        patient.list.map((v) => this.initPatientBrief(v.personID)),
      );
    } catch (e) {
      console.error('환자 리스트를 가져오는 과정에서 오류가 발생했습니다.', e);
    }
  }

  private async _getPatientBrief(personID: number) {
    const response = await lastValueFrom(
      this.httpService.get<PatientBriefResponse>(`/patient/brief/${personID}`),
    );

    return response.data;
  }

  public async getPatientBrief(personID: number) {
    return await this.cacheManager.get<PatientBriefResponse>(
      `${CACHE_PREFIX}.getPatientBrief.${personID}`,
    );
  }

  private async initPatientBrief(personID: number) {
    try {
      const result = await this._getPatientBrief(personID);
      await this.cacheManager.set(
        `${CACHE_PREFIX}.initPatientBrief.${personID}`,
        result,
        {
          ttl: Infinity,
        },
      );
    } catch (e) {
      console.error(
        `${personID} 환자의 요약정보를 가져오는 과정에서 오류가 발생했습니다.`,
        e,
      );
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  public async initData() {
    await Promise.all([
      this.initEthnicities(),
      this.initGenders(),
      this.initRace(),
      this.initPatients(),
    ]);
  }
}
