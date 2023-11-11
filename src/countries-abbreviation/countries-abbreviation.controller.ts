import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CountryAbbreviationService } from './countries-abbreviation.service';

@Controller('abbreviations')
export class CountryAbbreviationController {
  constructor(
    private readonly countryAbbreviationService: CountryAbbreviationService,
  ) {}

  @Get()
  findAll(
    @Query('name') name?: string,
    @Query('code') code?: string,
    @Query('page', ParseIntPipe) page?: number,
    @Query('limit', ParseIntPipe) limit?: number,
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
