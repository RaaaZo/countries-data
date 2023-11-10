import { Module } from '@nestjs/common';
import { CountriesByCitiesService } from './countries-by-cities.service';
import { CountriesByCitiesController } from './countries-by-cities.controller';

@Module({
  controllers: [CountriesByCitiesController],
  providers: [CountriesByCitiesService],
})
export class CountriesByCitiesModule {}
