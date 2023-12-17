import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountriesByCurrencyCodesService } from './countries-by-currency-codes.service';
import { OptionalIntPipe } from 'src/pipes/OptionalIntPipe';

@Controller('currency-codes')
export class CountriesByCurrencyCodesController {
  constructor(
    private readonly countriesByCurrencyCodesService: CountriesByCurrencyCodesService,
  ) {}

  @Get()
  findAll(
    @Query('countryName') countryName?: string,
    @Query('currencyCode') currencyCode?: string,
    @Query('page', OptionalIntPipe) page?: number,
    @Query('limit', OptionalIntPipe) limit?: number,
  ) {
    const queryParams = {
      countryName,
      currencyCode,
      page,
      limit,
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
