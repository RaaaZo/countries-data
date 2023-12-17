import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountriesBulkedDataService } from './countries-bulked-data.service';
import { OptionalIntPipe } from 'src/pipes/OptionalIntPipe';

@Controller('data')
export class CountriesBulkedDataController {
  constructor(
    private readonly countriesBulkedDataService: CountriesBulkedDataService,
  ) {}

  @Get()
  findAll(
    @Query('page', OptionalIntPipe) page?: number,
    @Query('limit', OptionalIntPipe) limit?: number,
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
