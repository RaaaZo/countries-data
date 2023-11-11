import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import countryByPopulationDensity from '../database/country-by-population-density.json';

type TFindAllQueryParams = {
  countryName?: string;
  populationDensity?: number;
};

@Injectable()
export class CountriesByPopulationDensityService {
  findAll({ countryName, populationDensity }: TFindAllQueryParams) {
    let countries = countryByPopulationDensity;

    if (countryName) {
      countries = countries.filter(({ country }) =>
        country.toLowerCase().includes(countryName.toLowerCase()),
      );
    }

    if (populationDensity) {
      countries = countries.filter(
        ({ density }) => populationDensity >= density,
      );
    }

    return countries;
  }

  findOne(countryNameOrPopulationDensity: string) {
    if (!countryNameOrPopulationDensity)
      return new BadRequestException(
        'You must provide a country name or population density',
      );

    const country = countryByPopulationDensity.find(
      ({ country }) => country === countryNameOrPopulationDensity,
    );

    if (country) {
      return country;
    }

    const populationDensity = countryByPopulationDensity.find(
      ({ density }) => density === Number(countryNameOrPopulationDensity),
    );

    if (populationDensity) {
      return populationDensity;
    }

    return new NotFoundException('Country with provided data does not exist');
  }
}
