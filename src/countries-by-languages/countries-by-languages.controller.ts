import { Controller, Get, Param } from '@nestjs/common';
import { CountriesByLanguagesService } from './countries-by-languages.service';

@Controller('languages')
export class CountriesByLanguagesController {
  constructor(
    private readonly countriesByLanguagesService: CountriesByLanguagesService,
  ) {}

  @Get()
  findAll(
    @Param('countryName') countryName?: string,
    @Param('languageName') languageName?: string,
  ) {
    const queryParams = {
      countryName,
      languageName,
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
