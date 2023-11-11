import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CountriesByGovernmentTypeService } from './countries-by-government-type.service';

@Controller('government-type')
export class CountriesByGovernmentTypeController {
  constructor(
    private readonly countriesByGovernmentTypeService: CountriesByGovernmentTypeService,
  ) {}

  @Get()
  findAll(
    @Query('countryName') countryName: string,
    @Query('governmentType') governmentType: string,
    @Query('page', ParseIntPipe) page?: number,
    @Query('limit', ParseIntPipe) limit?: number,
  ) {
    const queryParams = {
      countryName,
      governmentType,
      page,
      limit,
    };

    return this.countriesByGovernmentTypeService.findAll(queryParams);
  }

  @Get(':countryNameOrGovernmentType')
  findOne(
    @Param('countryNameOrGovernmentType') countryNameOrGovernmentType: string,
  ) {
    return this.countriesByGovernmentTypeService.findOne(
      countryNameOrGovernmentType,
    );
  }
}
