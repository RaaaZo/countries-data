import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountriesByPopulationService } from './countries-by-population.service';

@Controller('countries-by-population')
export class CountriesByPopulationController {
  constructor(
    private readonly countriesByPopulationService: CountriesByPopulationService,
  ) {}

  @Get()
  findAll(
    @Query('countryName') countryName: string,
    @Query('population') population: number,
  ) {
    const queryParams = { countryName, population };

    return this.countriesByPopulationService.findAll(queryParams);
  }

  @Get(':countryNameOrPopulation')
  findOne(@Param('countryNameOrPopulation') countryNameOrPopulation: string) {
    return this.countriesByPopulationService.findOne(countryNameOrPopulation);
  }
}
