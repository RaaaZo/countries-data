import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import countryByAbbreviation from '../database/country-by-abbreviation.json';

type TFindAllQueryParams = {
  name?: string;
  code?: string;
};

const NO_ITEMS_LENGTH = 0;

@Injectable()
export class CountryAbbreviationService {
  findAll({ code, name }: TFindAllQueryParams) {
    if (code) {
      const filteredCountry = countryByAbbreviation.filter(
        ({ abbreviation }) => {
          return abbreviation.toLowerCase().includes(code.toLowerCase());
        },
      );

      return filteredCountry;
    }

    if (name) {
      const filteredCountry = countryByAbbreviation.filter(
        ({ country: countryName }) => {
          return countryName.toLowerCase().includes(name.toLowerCase());
        },
      );

      return filteredCountry;
    }

    return countryByAbbreviation;
  }

  findOne(nameOrCode: string) {
    if (!nameOrCode)
      return new BadRequestException('You must provide a code or a name');

    const filteredCountryByAbbreviation = countryByAbbreviation.filter(
      ({ abbreviation }) => {
        return abbreviation.toLowerCase() === nameOrCode.toLowerCase();
      },
    );

    const filteredCountryByName = countryByAbbreviation.filter(
      ({ country }) => {
        return country.toLowerCase() === nameOrCode.toLowerCase();
      },
    );

    if (
      filteredCountryByAbbreviation.length === NO_ITEMS_LENGTH &&
      filteredCountryByName.length === NO_ITEMS_LENGTH
    )
      return new NotFoundException('Country not found');

    const properFilteredCountry =
      filteredCountryByAbbreviation.length > NO_ITEMS_LENGTH
        ? filteredCountryByAbbreviation
        : filteredCountryByName;

    return properFilteredCountry;
  }
}
