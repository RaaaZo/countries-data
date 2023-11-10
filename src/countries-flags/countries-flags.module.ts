import { Module } from '@nestjs/common';
import { CountriesFlagsService } from './countries-flags.service';
import { CountriesFlagsController } from './countries-flags.controller';

@Module({
  controllers: [CountriesFlagsController],
  providers: [CountriesFlagsService],
})
export class CountriesFlagsModule {}
