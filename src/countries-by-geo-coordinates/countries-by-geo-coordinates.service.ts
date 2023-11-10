import { Injectable } from '@nestjs/common';
import countriesByGeoCoordinates from '../database/country-by-geo-coordinates.json';

type TFindAllCountriesByGeoCoordinatesParams = {
  countryName?: string;
};

@Injectable()
export class CountriesByGeoCoordinatesService {
  findAll({ countryName }: TFindAllCountriesByGeoCoordinatesParams) {
    let filteredCountries = countriesByGeoCoordinates;

    if (countryName) {
      filteredCountries = countriesByGeoCoordinates.filter(({ country }) =>
        country.toLowerCase().includes(countryName.toLowerCase()),
      );
    }

    return filteredCountries;
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
