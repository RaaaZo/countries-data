import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountryAbbreviationService } from './country-abbreviation.service';

@Controller('country-abbreviation')
export class CountryAbbreviationController {
  constructor(
    private readonly countryAbbreviationService: CountryAbbreviationService,
  ) {}

  @Get()
  findAll(@Query('name') name?: string, @Query('code') code?: string) {
    const queryParams = {
      name,
      code,
    };

    return this.countryAbbreviationService.findAll(queryParams);
  }

  @Get(':nameOrCode')
  findByName(@Param('nameOrCode') nameOrCode: string) {
    return this.countryAbbreviationService.findOne(nameOrCode);
  }
}
