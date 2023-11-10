import { Injectable } from '@nestjs/common';
import countriesFlags from '../database/country-by-flag.json';

type TSingleCountryFlagDto = {
  country: string;
  flagBase64: string | null;
};

type TCountriesFlagsDto = TSingleCountryFlagDto[];

@Injectable()
export class CountriesFlagsService {
  private typedCountriesFlags = countriesFlags as TCountriesFlagsDto;

  findAll() {
    return this.typedCountriesFlags;
  }

  findOne(countryName: string) {
    const filteredCountry = this.typedCountriesFlags.find(
      ({ country }) => country.toLowerCase() === countryName.toLowerCase(),
    );

    return filteredCountry;
  }
}
