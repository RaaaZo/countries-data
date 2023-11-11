import { Injectable, NotFoundException } from '@nestjs/common';
import countryByContinent from '../database/country-by-continent.json';
import { TPaginationParams } from 'src/common/types/pagination';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/common/constants/pagination';
import { transformIntoPaginatedChunk } from 'src/common/utils/transformIntoPaginatedChunk';

type TFindAllCountriesByContinentsParams = TPaginationParams & {
  countryName?: string;
  continent?: string;
};

@Injectable()
export class CountriesByContinentsService {
  findAll({
    continent,
    countryName,
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
  }: TFindAllCountriesByContinentsParams) {
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

    const paginatedData = transformIntoPaginatedChunk(
      countriesByContinents,
      page,
      limit,
    );

    return paginatedData;
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
