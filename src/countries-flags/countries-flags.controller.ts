import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountriesFlagsService } from './countries-flags.service';

@Controller('flags')
export class CountriesFlagsController {
  constructor(private readonly countriesFlagsService: CountriesFlagsService) {}

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    const queryParams = {
      page,
      limit,
    };

    return this.countriesFlagsService.findAll(queryParams);
  }

  @Get(':countryName')
  findOne(@Param('countryName') countryName: string) {
    return this.countriesFlagsService.findOne(countryName);
  }
}
