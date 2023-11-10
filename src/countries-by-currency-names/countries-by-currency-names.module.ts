import { Module } from '@nestjs/common';
import { CountriesByCurrencyNamesService } from './countries-by-currency-names.service';
import { CountriesByCurrencyNamesController } from './countries-by-currency-names.controller';

@Module({
  controllers: [CountriesByCurrencyNamesController],
  providers: [CountriesByCurrencyNamesService],
})
export class CountriesByCurrencyNamesModule {}
