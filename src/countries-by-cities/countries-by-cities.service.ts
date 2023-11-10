import { Injectable, NotFoundException } from '@nestjs/common';
import countryByCities from '../database/country-by-cities.json';

type TFindAllCountriesByCitiesParams = {
  countryName?: string;
  cityName?: string;
};

@Injectable()
export class CountriesByCitiesService {
  findAll({ cityName, countryName }: TFindAllCountriesByCitiesParams) {
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

    return countriesByCities;
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
