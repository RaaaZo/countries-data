import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountriesByCurrencyCodesService } from './countries-by-currency-codes.service';

@Controller('currency-codes')
export class CountriesByCurrencyCodesController {
  constructor(
    private readonly countriesByCurrencyCodesService: CountriesByCurrencyCodesService,
  ) {}

  @Get()
  findAll(
    @Query('countryName') countryName?: string,
    @Query('currencyCode') currencyCode?: string,
  ) {
    const queryParams = {
      countryName,
      currencyCode,
    };

    return this.countriesByCurrencyCodesService.findAll(queryParams);
  }

  @Get(':currencyCodeOrCountryName')
  findOne(
    @Param('currencyCodeOrCountryName') currencyCodeOrCountryName: string,
  ) {
    return this.countriesByCurrencyCodesService.findOne(
      currencyCodeOrCountryName,
    );
  }
}
