import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountriesByPopulationService } from './countries-by-population.service';
import { OptionalIntPipe } from 'src/pipes/OptionalIntPipe';

@Controller('population')
export class CountriesByPopulationController {
  constructor(
    private readonly countriesByPopulationService: CountriesByPopulationService,
  ) {}

  @Get()
  findAll(
    @Query('countryName') countryName: string,
    @Query('population') population: number,
    @Query('page', OptionalIntPipe) page?: number,
    @Query('limit', OptionalIntPipe) limit?: number,
  ) {
    const queryParams = {
      countryName,
      population,
      page,
      limit,
    };

    return this.countriesByPopulationService.findAll(queryParams);
  }

  @Get(':countryNameOrPopulation')
  findOne(@Param('countryNameOrPopulation') countryNameOrPopulation: string) {
    return this.countriesByPopulationService.findOne(countryNameOrPopulation);
  }
}
