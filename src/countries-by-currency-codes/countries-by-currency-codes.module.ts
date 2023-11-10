import { Module } from '@nestjs/common';
import { CountriesByCurrencyCodesService } from './countries-by-currency-codes.service';
import { CountriesByCurrencyCodesController } from './countries-by-currency-codes.controller';

@Module({
  controllers: [CountriesByCurrencyCodesController],
  providers: [CountriesByCurrencyCodesService],
})
export class CountriesByCurrencyCodesModule {}
