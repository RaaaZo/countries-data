import { Injectable, NotFoundException } from '@nestjs/common';
import countryByContinent from '../database/country-by-continent.json';

type TFindAllCountriesByContinentsParams = {
  countryName?: string;
  continent?: string;
};

@Injectable()
export class CountriesByContinentsService {
  findAll({ continent, countryName }: TFindAllCountriesByContinentsParams) {
    let countriesByContinents = countryByContinent;

    if (continent) {
      countriesByContinents = countriesByContinents.filter(
        ({ continent: countryContinent }) =>
          countryContinent.toLowerCase().includes(continent.toLowerCase()),
      );
    }

    if (countryName) {
      countriesByContinents = countriesByContinents.filter(({ country }) =>
        country.toLowerCase().includes(countryName.toLowerCase()),
      );
    }

    return countriesByContinents;
  }

  findOne(countryOrContinent: string) {
    const filteredCountryByContinent = countryByContinent.filter(
      ({ country, continent }) => {
        const isCountry =
          country.toLowerCase() === countryOrContinent.toLowerCase();

        const isContinent =
          continent.toLowerCase() === countryOrContinent.toLowerCase();

        return isContinent || isCountry;
      },
    );

    if (!filteredCountryByContinent)
      return new NotFoundException('Country with provided data not found');

    return filteredCountryByContinent;
  }
}
