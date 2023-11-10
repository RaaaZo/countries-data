import { Module } from '@nestjs/common';
import { CountryAbbreviationService } from './countries-abbreviation.service';
import { CountryAbbreviationController } from './countries-abbreviation.controller';

@Module({
  controllers: [CountryAbbreviationController],
  providers: [CountryAbbreviationService],
})
export class CountryAbbreviationModule {}
