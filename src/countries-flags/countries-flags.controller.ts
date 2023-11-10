import { Controller, Get, Param } from '@nestjs/common';
import { CountriesFlagsService } from './countries-flags.service';

@Controller('flags')
export class CountriesFlagsController {
  constructor(private readonly countriesFlagsService: CountriesFlagsService) {}

  @Get()
  findAll() {
    return this.countriesFlagsService.findAll();
  }

  @Get(':countryName')
  findOne(@Param('countryName') countryName: string) {
    return this.countriesFlagsService.findOne(countryName);
  }
}
