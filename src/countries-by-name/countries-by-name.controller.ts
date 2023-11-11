import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CountryByNameService } from './countries-by-name.service';

@Controller('name')
export class CountryByNameController {
  constructor(private readonly countryByNameService: CountryByNameService) {}

  @Get()
  findAll(
    @Query('name') name?: string,
    @Query('page', ParseIntPipe) page?: number,
    @Query('limit', ParseIntPipe) limit?: number,
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
