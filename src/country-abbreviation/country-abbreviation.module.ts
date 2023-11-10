import { Module } from '@nestjs/common';
import { CountryAbbreviationService } from './country-abbreviation.service';
import { CountryAbbreviationController } from './country-abbreviation.controller';

@Module({
  controllers: [CountryAbbreviationController],
  providers: [CountryAbbreviationService],
})
export class CountryAbbreviationModule {}
