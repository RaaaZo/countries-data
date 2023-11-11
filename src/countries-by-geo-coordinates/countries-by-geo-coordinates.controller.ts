import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CountriesByGeoCoordinatesService } from './countries-by-geo-coordinates.service';

@Controller('coordinates')
export class CountriesByGeoCoordinatesController {
  constructor(
    private readonly countriesByGeoCoordinatesService: CountriesByGeoCoordinatesService,
  ) {}

  @Get()
  findAll(
    @Query('countryName') countryName?: string,
    @Query('page', ParseIntPipe) page?: number,
    @Query('limit', ParseIntPipe) limit?: number,
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
