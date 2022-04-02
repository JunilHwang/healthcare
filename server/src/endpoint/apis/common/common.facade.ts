import { Injectable } from '@nestjs/common';
import { Filters } from '@healthcare/domain';
import { HealthCareService } from '../../../modules/healthcare/health-care.service';

@Injectable()
export class CommonFacade {
  constructor(private readonly healthCareService: HealthCareService) {}
  public async getFilters() {}
}
