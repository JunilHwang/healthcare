import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  EthnicityResponse,
  GendersResponse,
  PatientBriefResponse,
  PatientResponse,
  RaceResponse,
} from '@healthcare/domain';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class HealthCareService {
  constructor(private readonly httpService: HttpService) {}

  public async getEthnicities() {
    const response = await lastValueFrom(
      this.httpService.get<EthnicityResponse>('/ethnicity/list'),
    );

    return response.data;
  }

  public async getRace() {
    const response = await lastValueFrom(
      this.httpService.get<RaceResponse>('/race/list'),
    );

    return response.data;
  }

  public async getGenders() {
    const response = await lastValueFrom(
      this.httpService.get<GendersResponse>('/gender/list'),
    );

    return response.data;
  }

  public async getPatients() {
    const response = await lastValueFrom(
      this.httpService.get<PatientResponse>('/patient/list'),
    );

    return response.data;
  }

  public async getPatientBrief(personID: number) {
    const response = await lastValueFrom(
      this.httpService.get<PatientBriefResponse>(`/patient/brief/${personID}`),
    );

    return response.data;
  }
}
