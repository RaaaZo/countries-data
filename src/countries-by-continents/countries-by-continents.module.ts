import { Module } from '@nestjs/common';
import { CountriesByContinentsService } from './countries-by-continents.service';
import { CountriesByContinentsController } from './countries-by-continents.controller';

@Module({
  controllers: [CountriesByContinentsController],
  providers: [CountriesByContinentsService],
})
export class CountriesByContinentsModule {}
