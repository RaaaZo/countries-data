import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { TPaginationParams } from 'src/common/types/pagination';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/common/constants/pagination';
import { transformIntoPaginatedChunk } from 'src/common/utils/transformIntoPaginatedChunk';
import { createCountriesBulkedData } from 'src/common/mappers/createCountriesBulkedData';

type TFindAllParams = TPaginationParams & {
  countryName?: string;
};

@Injectable()
export class CountriesBulkedDataService {
  findAll({
    countryName,
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
  }: TFindAllParams) {
    let filteredCountries = createCountriesBulkedData;

    if (countryName) {
      filteredCountries = filteredCountries.filter(({ country }) =>
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
    if (!countryName)
      return new BadRequestException('Country name is required');

    const country = createCountriesBulkedData.find(
      ({ country }) => country === countryName,
    );

    if (!country) return new NotFoundException('Country not found');

    return country;
  }
}
