import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountriesBulkedDataService } from './countries-bulked-data.service';

@Controller('data')
export class CountriesBulkedDataController {
  constructor(
    private readonly countriesBulkedDataService: CountriesBulkedDataService,
  ) {}

  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('countryName') countryName?: string,
  ) {
    const queryParams = {
      page,
      limit,
      countryName,
    };

    return this.countriesBulkedDataService.findAll(queryParams);
  }

  @Get(':countryName')
  findOne(@Param('countryName') countryName: string) {
    return this.countriesBulkedDataService.findOne(countryName);
  }
}
