import { Injectable } from '@nestjs/common';
import countryByGovernmentType from '../database/country-by-government-type.json';

type TFindAllCountriesByGovernmentTypeParams = {
  countryName?: string;
  governmentType?: string;
};

@Injectable()
export class CountriesByGovernmentTypeService {
  findAll({
    countryName,
    governmentType,
  }: TFindAllCountriesByGovernmentTypeParams) {
    let filteredCountries = countryByGovernmentType;

    if (countryName) {
      filteredCountries = countryByGovernmentType.filter(({ country }) =>
        country.toLowerCase().includes(countryName.toLowerCase()),
      );
    }

    if (governmentType) {
      filteredCountries = countryByGovernmentType.filter(
        ({ government }) =>
          government?.toLowerCase().includes(governmentType.toLowerCase()),
      );
    }

    return filteredCountries;
  }

  findOne(countryNameOrGovernmentType: string) {
    const filteredCountryByGovernmentType = countryByGovernmentType.filter(
      ({ country, government }) => {
        const isCountry =
          country.toLowerCase() === countryNameOrGovernmentType.toLowerCase();
        const isGovernment = government
          ?.toLowerCase()
          .includes(countryNameOrGovernmentType.toLowerCase());

        return isCountry || isGovernment;
      },
    );

    return filteredCountryByGovernmentType;
  }
}
