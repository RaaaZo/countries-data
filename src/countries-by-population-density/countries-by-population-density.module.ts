import { Module } from '@nestjs/common';
import { CountriesByPopulationDensityService } from './countries-by-population-density.service';
import { CountriesByPopulationDensityController } from './countries-by-population-density.controller';

@Module({
  controllers: [CountriesByPopulationDensityController],
  providers: [CountriesByPopulationDensityService],
})
export class CountriesByPopulationDensityModule {}
