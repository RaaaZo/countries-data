import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CountriesByPopulationService } from './countries-by-population.service';

@Controller('population')
export class CountriesByPopulationController {
  constructor(
    private readonly countriesByPopulationService: CountriesByPopulationService,
  ) {}

  @Get()
  findAll(
    @Query('countryName') countryName: string,
    @Query('population') population: number,
    @Query('page', ParseIntPipe) page?: number,
    @Query('limit', ParseIntPipe) limit?: number,
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
