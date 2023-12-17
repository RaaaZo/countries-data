import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountriesByCurrencyNamesService } from './countries-by-currency-names.service';
import { OptionalIntPipe } from 'src/pipes/OptionalIntPipe';

@Controller('currency-names')
export class CountriesByCurrencyNamesController {
  constructor(
    private readonly countriesByCurrencyNamesService: CountriesByCurrencyNamesService,
  ) {}

  @Get()
  findAll(
    @Query('countryName') countryName?: string,
    @Query('currencyName') currencyName?: string,
    @Query('page', OptionalIntPipe) page?: number,
    @Query('limit', OptionalIntPipe) limit?: number,
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
