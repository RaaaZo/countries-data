import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountriesByPopulationDensityService } from './countries-by-population-density.service';

@Controller('population-density')
export class CountriesByPopulationDensityController {
  constructor(
    private readonly countriesByPopulationDensityService: CountriesByPopulationDensityService,
  ) {}

  @Get()
  findAll(
    @Query('countryName') countryName: string,
    @Query('populationDensity') populationDensity: number,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const queryParams = {
      countryName,
      populationDensity,
      page,
      limit,
    };

    return this.countriesByPopulationDensityService.findAll(queryParams);
  }

  @Get(':countryNameOrPopulationDensity')
  findOne(
    @Param('countryNameOrPopulationDensity')
    countryNameOrPopulationDensity: string,
  ) {
    return this.countriesByPopulationDensityService.findOne(
      countryNameOrPopulationDensity,
    );
  }
}
