import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
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
    @Query('page', ParseIntPipe) page?: number,
    @Query('limit', ParseIntPipe) limit?: number,
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
