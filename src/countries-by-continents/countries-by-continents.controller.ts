import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountriesByContinentsService } from './countries-by-continents.service';
import { OptionalIntPipe } from 'src/pipes/OptionalIntPipe';

@Controller('continents')
export class CountriesByContinentsController {
  constructor(
    private readonly countriesByContinentsService: CountriesByContinentsService,
  ) {}

  @Get()
  findAll(
    @Query('countryName') countryName?: string,
    @Query('continent') continent?: string,
    @Query('page', OptionalIntPipe) page?: number,
    @Query('limit', OptionalIntPipe) limit?: number,
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
