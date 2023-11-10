import { Module } from '@nestjs/common';
import { CountriesByCapitalCityService } from './countries-by-capital-city.service';
import { CountriesByCapitalCityController } from './countries-by-capital-city.controller';

@Module({
  controllers: [CountriesByCapitalCityController],
  providers: [CountriesByCapitalCityService],
})
export class CountriesByCapitalCityModule {}
