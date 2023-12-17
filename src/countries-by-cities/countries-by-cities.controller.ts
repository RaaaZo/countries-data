import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountriesByCitiesService } from './countries-by-cities.service';
import { OptionalIntPipe } from 'src/pipes/OptionalIntPipe';

@Controller('cities')
export class CountriesByCitiesController {
  constructor(
    private readonly countriesByCitiesService: CountriesByCitiesService,
  ) {}

  @Get()
  findAll(
    @Query('countryName') countryName?: string,
    @Query('cityName') cityName?: string,
    @Query('page', OptionalIntPipe) page?: number,
    @Query('limit', OptionalIntPipe) limit?: number,
  ) {
    const queryParams = {
      countryName,
      cityName,
      page,
      limit,
    };

    return this.countriesByCitiesService.findAll(queryParams);
  }

  @Get(':countryOrCityName')
  findOne(@Param('countryOrCityName') countryOrCityName: string) {
    return this.countriesByCitiesService.findOne(countryOrCityName);
  }
}
