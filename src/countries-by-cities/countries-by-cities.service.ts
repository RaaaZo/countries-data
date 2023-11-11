import { Injectable, NotFoundException } from '@nestjs/common';
import countryByCities from '../database/country-by-cities.json';
import { TPaginationParams } from 'src/common/types/pagination';
import { transformIntoPaginatedChunk } from 'src/common/utils/transformIntoPaginatedChunk';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/common/constants/pagination';

type TFindAllCountriesByCitiesParams = TPaginationParams & {
  countryName?: string;
  cityName?: string;
};

@Injectable()
export class CountriesByCitiesService {
  findAll({
    cityName,
    countryName,
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
  }: TFindAllCountriesByCitiesParams) {
    let countriesByCities = countryByCities;

    if (countryName) {
      countriesByCities = countriesByCities.filter(({ country }) =>
        country.toLowerCase().includes(countryName.toLowerCase()),
      );
    }

    if (cityName) {
      countriesByCities = countriesByCities.filter(({ cities }) =>
        cities.some((city) =>
          city.toLowerCase().includes(cityName.toLowerCase()),
        ),
      );
    }

    const paginatedData = transformIntoPaginatedChunk(
      countriesByCities,
      page,
      limit,
    );

    return paginatedData;
  }

  findOne(countryOrCityName: string) {
    const countryByCity = countryByCities.find(({ country, cities }) => {
      const isCountry =
        country.toLowerCase() === countryOrCityName.toLowerCase();
      const isCity = cities.some((city) =>
        city.toLowerCase().includes(countryOrCityName.toLowerCase()),
      );

      return isCountry || isCity;
    });

    if (!countryByCity)
      return new NotFoundException('Country with provided data not found');

    return countryByCity;
  }
}
