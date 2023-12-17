import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountriesByCapitalCityService } from './countries-by-capital-city.service';
import { OptionalIntPipe } from 'src/pipes/OptionalIntPipe';

@Controller('capital-city')
export class CountriesByCapitalCityController {
  constructor(
    private readonly countriesByCapitalCityService: CountriesByCapitalCityService,
  ) {}

  @Get()
  findAll(
    @Query('name') name?: string,
    @Query('capital') capital?: string,
    @Query('page', OptionalIntPipe) page?: number,
    @Query('limit', OptionalIntPipe) limit?: number,
  ) {
    const queryParams = {
      name,
      capital,
      page,
      limit,
    };

    return this.countriesByCapitalCityService.findAll(queryParams);
  }

  @Get(':nameOrCapital')
  findOne(@Param('nameOrCapital') nameOrCapital: string) {
    return this.countriesByCapitalCityService.findOne(nameOrCapital);
  }
}
