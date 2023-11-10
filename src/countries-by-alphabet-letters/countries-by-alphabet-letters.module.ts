import { Module } from '@nestjs/common';
import { CountriesByAlphabetLettersService } from './countries-by-alphabet-letters.service';
import { CountriesByAlphabetLettersController } from './countries-by-alphabet-letters.controller';

@Module({
  controllers: [CountriesByAlphabetLettersController],
  providers: [CountriesByAlphabetLettersService],
})
export class CountriesByAlphabetLettersModule {}
