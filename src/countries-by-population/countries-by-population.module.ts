import { Module } from '@nestjs/common';
import { CountriesByPopulationService } from './countries-by-population.service';
import { CountriesByPopulationController } from './countries-by-population.controller';

@Module({
  controllers: [CountriesByPopulationController],
  providers: [CountriesByPopulationService],
})
export class CountriesByPopulationModule {}
