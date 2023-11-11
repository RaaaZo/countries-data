import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CountriesByCapitalCityService } from './countries-by-capital-city.service';

@Controller('capital-city')
export class CountriesByCapitalCityController {
  constructor(
    private readonly countriesByCapitalCityService: CountriesByCapitalCityService,
  ) {}

  @Get()
  findAll(
    @Query('name') name?: string,
    @Query('capital') capital?: string,
    @Query('page', ParseIntPipe) page?: number,
    @Query('limit', ParseIntPipe) limit?: number,
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
