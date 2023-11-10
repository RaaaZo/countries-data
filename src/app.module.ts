import { Module } from '@nestjs/common';
import { CountryByNameModule } from './countries-by-name/countries-by-name.module';
import { CountryAbbreviationModule } from './countries-abbreviation/countries-abbreviation.module';
import { CountriesByAlphabetLettersModule } from './countries-by-alphabet-letters/countries-by-alphabet-letters.module';
import { CountriesByCapitalCityModule } from './countries-by-capital-city/countries-by-capital-city.module';
import { CountriesByCitiesModule } from 'src/countries-by-cities/countries-by-cities.module';
import { CountriesByContinentsModule } from './countries-by-continents/countries-by-continents.module';
import { CountriesByCurrencyCodesModule } from './countries-by-currency-codes/countries-by-currency-codes.module';
import { CountriesByCurrencyNamesModule } from './countries-by-currency-names/countries-by-currency-names.module';
import { CountriesFlagsModule } from './countries-flags/countries-flags.module';
import { CountriesByGeoCoordinatesModule } from './countries-by-geo-coordinates/countries-by-geo-coordinates.module';

@Module({
  imports: [
    CountryByNameModule,
    CountryAbbreviationModule,
    CountriesByAlphabetLettersModule,
    CountriesByCapitalCityModule,
    CountriesByCitiesModule,
    CountriesByContinentsModule,
    CountriesByCurrencyCodesModule,
    CountriesByCurrencyNamesModule,
    CountriesFlagsModule,
    CountriesByGeoCoordinatesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
