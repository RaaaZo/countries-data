import { Controller, Get, Param } from '@nestjs/common';
import { CountriesByAlphabetLettersService } from './countries-by-alphabet-letters.service';

@Controller('countries-by-alphabet-letters')
export class CountriesByAlphabetLettersController {
  constructor(
    private readonly countriesByAlphabetLettersService: CountriesByAlphabetLettersService,
  ) {}

  @Get()
  findAll() {
    return this.countriesByAlphabetLettersService.findAll();
  }

  @Get(':alphabetLetter')
  findOne(@Param('alphabetLetter') alphabetLetter: string) {
    return this.countriesByAlphabetLettersService.findOne(alphabetLetter);
  }
}
