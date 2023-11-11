import { Injectable } from '@nestjs/common';
import countryByCurrencyCode from '../database/country-by-currency-code.json';
import { TPaginationParams } from 'src/common/types/pagination';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/common/constants/pagination';
import { transformIntoPaginatedChunk } from 'src/common/utils/transformIntoPaginatedChunk';

type TFindAllCountriesByCurrencyCodesParams = TPaginationParams & {
  countryName?: string;
  currencyCode?: string;
};

@Injectable()
export class CountriesByCurrencyCodesService {
  findAll({
    countryName,
    currencyCode,
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
  }: TFindAllCountriesByCurrencyCodesParams) {
    let filteredCountries = countryByCurrencyCode;

    if (currencyCode) {
      filteredCountries = countryByCurrencyCode.filter(
        ({ currencyCode }) =>
          currencyCode?.toLowerCase().includes(currencyCode.toLowerCase()),
      );
    }

    if (countryName) {
      filteredCountries = countryByCurrencyCode.filter(({ country }) =>
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

  findOne(currencyCodeOrCountryName: string) {
    const filteredCountryByCurrencyCode = countryByCurrencyCode.filter(
      ({ currencyCode, country }) => {
        const isCurrencyCode =
          currencyCode?.toLowerCase() ===
          currencyCodeOrCountryName.toLowerCase();

        const isCountry =
          country.toLowerCase() === currencyCodeOrCountryName.toLowerCase();

        return isCurrencyCode || isCountry;
      },
    );

    return filteredCountryByCurrencyCode;
  }
}
