import { Module } from '@nestjs/common';
import { CountriesByLanguagesService } from './countries-by-languages.service';
import { CountriesByLanguagesController } from './countries-by-languages.controller';

@Module({
  controllers: [CountriesByLanguagesController],
  providers: [CountriesByLanguagesService],
})
export class CountriesByLanguagesModule {}
