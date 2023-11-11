import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import countryByPopulation from '../database/country-by-population.json';
import { TPaginationParams } from 'src/common/types/pagination';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/common/constants/pagination';
import { transformIntoPaginatedChunk } from 'src/common/utils/transformIntoPaginatedChunk';

type TFindAllQueryParams = TPaginationParams & {
  countryName?: string;
  population?: number;
};

@Injectable()
export class CountriesByPopulationService {
  findAll({
    countryName,
    population,
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
  }: TFindAllQueryParams) {
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

    const paginatedData = transformIntoPaginatedChunk(countries, page, limit);

    return paginatedData;
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
