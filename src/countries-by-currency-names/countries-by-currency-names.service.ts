import { Injectable } from '@nestjs/common';
import countryByCurrencyName from '../database/country-by-currency-name.json';

type TFindAllCountriesByCurrencyNamesParams = {
  countryName?: string;
  currencyName?: string;
};

@Injectable()
export class CountriesByCurrencyNamesService {
  findAll({
    countryName,
    currencyName,
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

    return filteredCountries;
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
