import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryByNameModule } from './country-by-name/country-by-name.module';
import { CountryAbbreviationModule } from './country-abbreviation/country-abbreviation.module';

@Module({
  imports: [CountryByNameModule, CountryAbbreviationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
