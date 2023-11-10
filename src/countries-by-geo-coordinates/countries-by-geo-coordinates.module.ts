import { Module } from '@nestjs/common';
import { CountriesByGeoCoordinatesService } from './countries-by-geo-coordinates.service';
import { CountriesByGeoCoordinatesController } from './countries-by-geo-coordinates.controller';

@Module({
  controllers: [CountriesByGeoCoordinatesController],
  providers: [CountriesByGeoCoordinatesService],
})
export class CountriesByGeoCoordinatesModule {}
