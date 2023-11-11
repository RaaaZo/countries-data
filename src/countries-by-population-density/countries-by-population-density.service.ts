import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import countryByPopulationDensity from '../database/country-by-population-density.json';
import { TPaginationParams } from 'src/common/types/pagination';
import { transformIntoPaginatedChunk } from 'src/common/utils/transformIntoPaginatedChunk';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/common/constants/pagination';

type TFindAllQueryParams = TPaginationParams & {
  countryName?: string;
  populationDensity?: number;
};

@Injectable()
export class CountriesByPopulationDensityService {
  findAll({
    countryName,
    populationDensity,
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
  }: TFindAllQueryParams) {
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

    const paginatedData = transformIntoPaginatedChunk(countries, page, limit);

    return paginatedData;
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
