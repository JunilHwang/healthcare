import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EndpointModule } from './endpoint/endpoint.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), EndpointModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
