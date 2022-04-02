import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  EthnicityResponse,
  Filters,
  GendersResponse,
  RaceResponse,
} from '@healthcare/domain';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class HealthCareService {
  #filters: Filters;

  constructor(private readonly httpService: HttpService) {}

  public async getFilters(): Promise<Filters> {
    if (this.#filters !== undefined) {
      return this.#filters;
    }
    const ethnicity = lastValueFrom(
      this.httpService.get<EthnicityResponse>('/ethnicity/list'),
    );
    const race = lastValueFrom(
      this.httpService.get<RaceResponse>('/race/list'),
    );
    const gender = lastValueFrom(
      this.httpService.get<GendersResponse>('/gender/list'),
    );

    this.#filters = {
      ethnicity: await ethnicity.then(({ data }) => data.ethnicityList),
      race: await race.then(({ data }) => data.raceList),
      gender: await gender.then(({ data }) => data.genderList),
    };

    return this.#filters;
  }
}
