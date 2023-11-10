import { Module } from '@nestjs/common';
import { CountryByNameService } from './countries-by-name.service';
import { CountryByNameController } from './countries-by-name.controller';

@Module({
  controllers: [CountryByNameController],
  providers: [CountryByNameService],
})
export class CountryByNameModule {}
