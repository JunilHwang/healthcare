import { Module } from '@nestjs/common';
import { HealthCareModule } from '../../../modules/healthcare/health-care.module';
import { CommonFacade } from './common.facade';
import { CommonController } from './common.controller';

@Module({
  imports: [HealthCareModule],
  providers: [CommonFacade],
  controllers: [CommonController],
})
export class CommonModule {}
