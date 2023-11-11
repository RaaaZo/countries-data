import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import countryByPopulation from '../database/country-by-population.json';

type TFindAllQueryParams = {
  countryName?: string;
  population?: number;
};

@Injectable()
export class CountriesByPopulationService {
  findAll({ countryName, population }: TFindAllQueryParams) {
    let countries = countryByPopulation;

    if (countryName) {
      countries = countries.filter(({ country }) =>
        country.toLowerCase().includes(countryName.toLowerCase()),
      );
    }

    if (population) {
      countries = countries.filter(
        ({ population }) => population >= population,
      );
    }

    return countries;
  }

  findOne(countryNameOrPopulation: string) {
    if (!countryNameOrPopulation)
      return new BadRequestException(
        'You must provide a country name or population',
      );

    const country = countryByPopulation.find(
      ({ country }) => country === countryNameOrPopulation,
    );

    if (country) {
      return country;
    }

    const population = countryByPopulation.find(
      ({ population }) => population === Number(countryNameOrPopulation),
    );

    if (population) {
      return population;
    }

    return new NotFoundException('Country with provided data does not exist');
  }
}
