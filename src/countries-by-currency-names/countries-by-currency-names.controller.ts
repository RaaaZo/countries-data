import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CountriesByCurrencyNamesService } from './countries-by-currency-names.service';

@Controller('currency-names')
export class CountriesByCurrencyNamesController {
  constructor(
    private readonly countriesByCurrencyNamesService: CountriesByCurrencyNamesService,
  ) {}

  @Get()
  findAll(
    @Query('countryName') countryName?: string,
    @Query('currencyName') currencyName?: string,
    @Query('page', ParseIntPipe) page?: number,
    @Query('limit', ParseIntPipe) limit?: number,
  ) {
    const queryParams = {
      countryName,
      currencyName,
      page,
      limit,
    };

    return this.countriesByCurrencyNamesService.findAll(queryParams);
  }

  @Get(':currencyNameOrCountryName')
  findOne(
    @Param('currencyNameOrCountryName') currencyNameOrCountryName: string,
  ) {
    return this.countriesByCurrencyNamesService.findOne(
      currencyNameOrCountryName,
    );
  }
}
