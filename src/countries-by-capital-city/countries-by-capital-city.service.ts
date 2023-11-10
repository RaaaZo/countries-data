import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import countryByCapitalCity from '../database/country-by-capital-city.json';

type TCountryByCapitalCityDto = {
  country: string;
  city: string | null;
};

type TFindAllQueryParams = {
  name?: string;
  capital?: string;
};

const NO_ITEMS_LENGTH = 0;

@Injectable()
export class CountriesByCapitalCityService {
  findAll({ capital, name }: TFindAllQueryParams) {
    let filteredCountry: TCountryByCapitalCityDto[] = [];

    if (capital) {
      filteredCountry = countryByCapitalCity.filter(
        ({ city: databaseCapital }) =>
          databaseCapital?.toLowerCase().includes(capital.toLowerCase()),
      );
    }

    if (name) {
      filteredCountry = countryByCapitalCity.filter(
        ({ country }) => country?.toLowerCase().includes(name.toLowerCase()),
      );
    }

    if (capital || name) {
      return filteredCountry;
    }

    return countryByCapitalCity;
  }

  findOne(nameOrCapital: string) {
    if (!nameOrCapital)
      return new BadRequestException(
        'You must provide a capital city or a country name',
      );

    const filteredCountryByCapitalCity = countryByCapitalCity.filter(
      ({ city: capitalCity }) => {
        return capitalCity?.toLowerCase() === nameOrCapital.toLowerCase();
      },
    );

    const filteredCountryByName = countryByCapitalCity.filter(({ country }) => {
      return country.toLowerCase() === nameOrCapital.toLowerCase();
    });

    if (
      filteredCountryByCapitalCity.length === NO_ITEMS_LENGTH &&
      filteredCountryByName.length === NO_ITEMS_LENGTH
    )
      return new NotFoundException('Country with provided data not found');

    const properFilteredCountry =
      filteredCountryByCapitalCity.length > NO_ITEMS_LENGTH
        ? filteredCountryByCapitalCity
        : filteredCountryByName;

    return properFilteredCountry;
  }
}
