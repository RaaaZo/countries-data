import { Module } from '@nestjs/common';
import { CountriesByGovernmentTypeService } from './countries-by-government-type.service';
import { CountriesByGovernmentTypeController } from './countries-by-government-type.controller';

@Module({
  controllers: [CountriesByGovernmentTypeController],
  providers: [CountriesByGovernmentTypeService],
})
export class CountriesByGovernmentTypeModule {}
