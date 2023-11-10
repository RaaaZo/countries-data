import { Module } from '@nestjs/common';
import { CountryByNameService } from './country-by-name.service';
import { CountryByNameController } from './country-by-name.controller';

@Module({
  controllers: [CountryByNameController],
  providers: [CountryByNameService],
})
export class CountryByNameModule {}
