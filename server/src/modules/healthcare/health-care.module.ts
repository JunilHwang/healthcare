import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HealthCareService } from './health-care.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      baseURL: 'http://49.50.167.136:9871/api',
    }),
  ],
  providers: [HealthCareService],
  exports: [HealthCareService],
})
export class HealthCareModule {}
