import { Injectable } from '@nestjs/common';
import countryByCurrencyCode from '../database/country-by-currency-code.json';

type TFindAllCountriesByCurrencyCodesParams = {
  countryName?: string;
  currencyCode?: string;
};

@Injectable()
export class CountriesByCurrencyCodesService {
  findAll({
    countryName,
    currencyCode,
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

    return filteredCountries;
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
