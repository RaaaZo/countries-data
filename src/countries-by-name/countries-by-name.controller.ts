import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountryByNameService } from './countries-by-name.service';

@Controller('name')
export class CountryByNameController {
  constructor(private readonly countryByNameService: CountryByNameService) {}

  @Get('/test')
  findAll(
    @Query('name') name?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const queryParams = {
      name,
      page,
      limit,
    };

    return this.countryByNameService.findAll(queryParams);
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.countryByNameService.findOne(name);
  }
}
