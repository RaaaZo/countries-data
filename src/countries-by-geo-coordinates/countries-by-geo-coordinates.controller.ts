import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountriesByGeoCoordinatesService } from './countries-by-geo-coordinates.service';
import { OptionalIntPipe } from 'src/pipes/OptionalIntPipe';

@Controller('coordinates')
export class CountriesByGeoCoordinatesController {
  constructor(
    private readonly countriesByGeoCoordinatesService: CountriesByGeoCoordinatesService,
  ) {}

  @Get()
  findAll(
    @Query('countryName') countryName?: string,
    @Query('page', OptionalIntPipe) page?: number,
    @Query('limit', OptionalIntPipe) limit?: number,
  ) {
    const queryParams = {
      countryName,
      page,
      limit,
    };

    return this.countriesByGeoCoordinatesService.findAll(queryParams);
  }

  @Get(':countryName')
  findOne(@Param('countryName') countryName: string) {
    return this.countriesByGeoCoordinatesService.findOne(countryName);
  }
}
