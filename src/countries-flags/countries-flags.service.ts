import { Injectable } from '@nestjs/common';
import countriesFlags from '../database/country-by-flag.json';
import { TPaginationParams } from 'src/common/types/pagination';
import { transformIntoPaginatedChunk } from 'src/common/utils/transformIntoPaginatedChunk';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/common/constants/pagination';

type TSingleCountryFlagDto = {
  country: string;
  flagBase64: string | null;
};

type TCountriesFlagsDto = TSingleCountryFlagDto[];

type TFindAllQueryParams = TPaginationParams;

@Injectable()
export class CountriesFlagsService {
  private typedCountriesFlags = countriesFlags as TCountriesFlagsDto;

  findAll({ limit = DEFAULT_LIMIT, page = DEFAULT_PAGE }: TFindAllQueryParams) {
    const paginatedData = transformIntoPaginatedChunk(
      this.typedCountriesFlags,
      page,
      limit,
    );

    return paginatedData;
  }

  findOne(countryName: string) {
    const filteredCountry = this.typedCountriesFlags.find(
      ({ country }) => country.toLowerCase() === countryName.toLowerCase(),
    );

    return filteredCountry;
  }
}
