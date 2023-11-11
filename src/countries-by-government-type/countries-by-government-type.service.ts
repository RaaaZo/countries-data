import { Injectable } from '@nestjs/common';
import countryByGovernmentType from '../database/country-by-government-type.json';
import { TPaginationParams } from 'src/common/types/pagination';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/common/constants/pagination';
import { transformIntoPaginatedChunk } from 'src/common/utils/transformIntoPaginatedChunk';

type TFindAllCountriesByGovernmentTypeParams = TPaginationParams & {
  countryName?: string;
  governmentType?: string;
};

@Injectable()
export class CountriesByGovernmentTypeService {
  findAll({
    countryName,
    governmentType,
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
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

    const paginatedData = transformIntoPaginatedChunk(
      filteredCountries,
      page,
      limit,
    );

    return paginatedData;
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
