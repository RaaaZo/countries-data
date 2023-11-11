import { Injectable } from '@nestjs/common';
import countriesByGeoCoordinates from '../database/country-by-geo-coordinates.json';
import { TPaginationParams } from 'src/common/types/pagination';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/common/constants/pagination';
import { transformIntoPaginatedChunk } from 'src/common/utils/transformIntoPaginatedChunk';

type TFindAllCountriesByGeoCoordinatesParams = TPaginationParams & {
  countryName?: string;
};

@Injectable()
export class CountriesByGeoCoordinatesService {
  findAll({
    countryName,
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
  }: TFindAllCountriesByGeoCoordinatesParams) {
    let filteredCountries = countriesByGeoCoordinates;

    if (countryName) {
      filteredCountries = countriesByGeoCoordinates.filter(({ country }) =>
        country.toLowerCase().includes(countryName.toLowerCase()),
      );
    }

    const paginatedData = transformIntoPaginatedChunk(
      filteredCountries,
      page,
      limit,
    );

    return paginatedData;
  }

  findOne(countryName: string) {
    const filteredCountryByGeoCoordinates = countriesByGeoCoordinates.filter(
      ({ country }) => {
        const isCountry = country.toLowerCase() === countryName.toLowerCase();

        return isCountry;
      },
    );

    return filteredCountryByGeoCoordinates;
  }
}
