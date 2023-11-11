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
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const queryParams = {
      countryName,
      continent,
      page,
      limit,
    };

    return this.countriesByContinentsService.findAll(queryParams);
  }

  @Get(':countryOrContinent')
  findOne(@Param('countryOrContinent') countryOrContinent: string) {
    return this.countriesByContinentsService.findOne(countryOrContinent);
  }
}
