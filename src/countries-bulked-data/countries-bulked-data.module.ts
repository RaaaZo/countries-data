import { Module } from '@nestjs/common';
import { CountriesBulkedDataService } from './countries-bulked-data.service';
import { CountriesBulkedDataController } from './countries-bulked-data.controller';

@Module({
  controllers: [CountriesBulkedDataController],
  providers: [CountriesBulkedDataService],
})
export class CountriesBulkedDataModule {}
