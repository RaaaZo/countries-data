import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountriesByGovernmentTypeService } from './countries-by-government-type.service';

@Controller('countries-by-government-type')
export class CountriesByGovernmentTypeController {
  constructor(
    private readonly countriesByGovernmentTypeService: CountriesByGovernmentTypeService,
  ) {}

  @Get()
  findAll(
    @Query('countryName') countryName: string,
    @Query('governmentType') governmentType: string,
  ) {
    const queryParams = {
      countryName,
      governmentType,
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
