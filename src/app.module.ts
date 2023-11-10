import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryByNameModule } from './countries-by-name/countries-by-name.module';
import { CountryAbbreviationModule } from './countries-abbreviation/countries-abbreviation.module';
import { CountriesByAlphabetLettersModule } from './countries-by-alphabet-letters/countries-by-alphabet-letters.module';

@Module({
  imports: [
    CountryByNameModule,
    CountryAbbreviationModule,
    CountriesByAlphabetLettersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
