import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryByNameModule } from './country-by-name/country-by-name.module';

@Module({
  imports: [CountryByNameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
