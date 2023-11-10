import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountriesByContinentsService } from './countries-by-continents.service';

@Controller('continents')
export class CountriesByContinentsController {
  constructor(
    private readonly countriesByContinentsService: CountriesByContinentsService,
  ) {}

  @Get()
  findAll(
    @Query('countryName') countryName?: string,
    @Query('continent') continent?: string,
  ) {
    const queryParams = {
      countryName,
      continent,
    };

    return this.countriesByContinentsService.findAll(queryParams);
  }

  @Get(':countryOrContinent')
  findOne(@Param('countryOrContinent') countryOrContinent: string) {
    return this.countriesByContinentsService.findOne(countryOrContinent);
  }
}
