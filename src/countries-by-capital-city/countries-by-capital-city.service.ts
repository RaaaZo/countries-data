import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import countryByCapitalCity from '../database/country-by-capital-city.json';
import { TPaginationParams } from 'src/common/types/pagination';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/common/constants/pagination';
import { transformIntoPaginatedChunk } from 'src/common/utils/transformIntoPaginatedChunk';

type TCountryByCapitalCityDto = {
  country: string;
  city: string | null;
};

type TFindAllQueryParams = TPaginationParams & {
  name?: string;
  capital?: string;
};

const NO_ITEMS_LENGTH = 0;

@Injectable()
export class CountriesByCapitalCityService {
  findAll({
    capital,
    name,
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
  }: TFindAllQueryParams) {
    let filteredCountry: TCountryByCapitalCityDto[] = countryByCapitalCity;

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

    const paginatedData = transformIntoPaginatedChunk(
      filteredCountry,
      page,
      limit,
    );

    return paginatedData;
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
