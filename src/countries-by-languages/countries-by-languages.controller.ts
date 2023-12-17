import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountriesByLanguagesService } from './countries-by-languages.service';
import { OptionalIntPipe } from 'src/pipes/OptionalIntPipe';

@Controller('languages')
export class CountriesByLanguagesController {
  constructor(
    private readonly countriesByLanguagesService: CountriesByLanguagesService,
  ) {}

  @Get()
  findAll(
    @Query('countryName') countryName?: string,
    @Query('languageName') languageName?: string,
    @Query('page', OptionalIntPipe) page?: number,
    @Query('limit', OptionalIntPipe) limit?: number,
  ) {
    const queryParams = {
      countryName,
      languageName,
      page,
      limit,
    };

    return this.countriesByLanguagesService.findAll(queryParams);
  }

  @Get(':countryNameOrLanguageName')
  findOne(
    @Param('countryNameOrLanguageName') countryNameOrLanguageName: string,
  ) {
    return this.countriesByLanguagesService.findOne(countryNameOrLanguageName);
  }
}
