import { Injectable, NotFoundException } from '@nestjs/common';
import countriesByName from '../database/country-by-name.json';

type TFindAllQueryParams = {
  name?: string;
};

@Injectable()
export class CountryByNameService {
  findAll({ name }: TFindAllQueryParams) {
    if (name) {
      const filteredCountries = countriesByName.filter(({ country }) => {
        return country.toLowerCase().includes(name.toLowerCase());
      });

      return filteredCountries;
    }

    return countriesByName;
  }

  findOne(name: string) {
    const filteredCountry = countriesByName.filter(({ country }) => {
      return country.toLowerCase() === name.toLowerCase();
    });

    if (filteredCountry.length === 0)
      return new NotFoundException(`Country with name ${name} not found`);

    return filteredCountry;
  }
}
