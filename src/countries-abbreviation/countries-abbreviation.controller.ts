import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountryAbbreviationService } from './countries-abbreviation.service';
import { OptionalIntPipe } from 'src/pipes/OptionalIntPipe';

@Controller('abbreviations')
export class CountryAbbreviationController {
  constructor(
    private readonly countryAbbreviationService: CountryAbbreviationService,
  ) {}

  @Get()
  findAll(
    @Query('name') name?: string,
    @Query('code') code?: string,
    @Query('page', OptionalIntPipe) page?: number,
    @Query('limit', OptionalIntPipe) limit?: number,
  ) {
    const queryParams = {
      name,
      code,
      page,
      limit,
    };

    return this.countryAbbreviationService.findAll(queryParams);
  }

  @Get(':nameOrCode')
  findOne(@Param('nameOrCode') nameOrCode: string) {
    return this.countryAbbreviationService.findOne(nameOrCode);
  }
}
