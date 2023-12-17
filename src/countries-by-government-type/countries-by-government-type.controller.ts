import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountriesByGovernmentTypeService } from './countries-by-government-type.service';
import { OptionalIntPipe } from 'src/pipes/OptionalIntPipe';

@Controller('government-type')
export class CountriesByGovernmentTypeController {
  constructor(
    private readonly countriesByGovernmentTypeService: CountriesByGovernmentTypeService,
  ) {}

  @Get()
  findAll(
    @Query('countryName') countryName: string,
    @Query('governmentType') governmentType: string,
    @Query('page', OptionalIntPipe) page?: number,
    @Query('limit', OptionalIntPipe) limit?: number,
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
