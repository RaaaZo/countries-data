import { Injectable } from '@nestjs/common';
import countryByCurrencyName from '../database/country-by-currency-name.json';
import { TPaginationParams } from 'src/common/types/pagination';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/common/constants/pagination';
import { transformIntoPaginatedChunk } from 'src/common/utils/transformIntoPaginatedChunk';

type TFindAllCountriesByCurrencyNamesParams = TPaginationParams & {
  countryName?: string;
  currencyName?: string;
};

@Injectable()
export class CountriesByCurrencyNamesService {
  findAll({
    countryName,
    currencyName,
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
  }: TFindAllCountriesByCurrencyNamesParams) {
    let filteredCountries = countryByCurrencyName;

    if (currencyName) {
      filteredCountries = countryByCurrencyName.filter(
        ({ currencyName }) =>
          currencyName?.toLowerCase().includes(currencyName.toLowerCase()),
      );
    }

    if (countryName) {
      filteredCountries = countryByCurrencyName.filter(({ country }) =>
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

  findOne(currencyNameOrCountryName: string) {
    const filteredCountryByCurrencyName = countryByCurrencyName.filter(
      ({ currencyName, country }) => {
        const isCurrencyName =
          currencyName?.toLowerCase() ===
          currencyNameOrCountryName.toLowerCase();

        const isCountry =
          country.toLowerCase() === currencyNameOrCountryName.toLowerCase();

        return isCurrencyName || isCountry;
      },
    );

    return filteredCountryByCurrencyName;
  }
}
