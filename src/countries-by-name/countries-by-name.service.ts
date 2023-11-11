import { Injectable, NotFoundException } from '@nestjs/common';
import countriesByName from '../database/country-by-name.json';
import { TPaginationParams } from 'src/common/types/pagination';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/common/constants/pagination';
import { transformIntoPaginatedChunk } from 'src/common/utils/transformIntoPaginatedChunk';

type TFindAllQueryParams = TPaginationParams & {
  name?: string;
};

@Injectable()
export class CountryByNameService {
  findAll({
    name,
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
  }: TFindAllQueryParams) {
    const filteredCountries = countriesByName;

    if (name) {
      countriesByName.filter(({ country }) => {
        return country.toLowerCase().includes(name.toLowerCase());
      });
    }

    const paginatedData = transformIntoPaginatedChunk(
      filteredCountries,
      page,
      limit,
    );

    return paginatedData;
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
