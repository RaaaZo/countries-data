import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountryByNameService } from './country-by-name.service';

@Controller('country-by-name')
export class CountryByNameController {
  constructor(private readonly countryByNameService: CountryByNameService) {}

  @Get()
  findAll(@Query('name') name?: string) {
    const params = {
      name,
    };

    return this.countryByNameService.findAll(params);
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.countryByNameService.findOne(name);
  }
}
