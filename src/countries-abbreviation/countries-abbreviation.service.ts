import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import countryByAbbreviation from '../database/country-by-abbreviation.json';
import { TPaginationParams } from 'src/common/types/pagination';
import { transformIntoPaginatedChunk } from 'src/common/utils/transformIntoPaginatedChunk';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/common/constants/pagination';

type TFindAllQueryParams = TPaginationParams & {
  name?: string;
  code?: string;
};

const NO_ITEMS_LENGTH = 0;

@Injectable()
export class CountryAbbreviationService {
  findAll({
    code,
    name,
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
  }: TFindAllQueryParams) {
    const filteredCountryByAbbreviation = countryByAbbreviation;

    if (code) {
      countryByAbbreviation.filter(({ abbreviation }) => {
        return abbreviation.toLowerCase().includes(code.toLowerCase());
      });
    }

    if (name) {
      countryByAbbreviation.filter(({ country: countryName }) => {
        return countryName.toLowerCase().includes(name.toLowerCase());
      });
    }

    const paginatedData = transformIntoPaginatedChunk(
      filteredCountryByAbbreviation,
      page,
      limit,
    );

    return paginatedData;
  }

  findOne(nameOrCode: string) {
    if (!nameOrCode)
      return new BadRequestException('You must provide a code or a name');

    const filteredCountryByAbbreviation = countryByAbbreviation.filter(
      ({ abbreviation }) => {
        return abbreviation.toLowerCase() === nameOrCode.toLowerCase();
      },
    );

    const filteredCountryByName = countryByAbbreviation.filter(
      ({ country }) => {
        return country.toLowerCase() === nameOrCode.toLowerCase();
      },
    );

    if (
      filteredCountryByAbbreviation.length === NO_ITEMS_LENGTH &&
      filteredCountryByName.length === NO_ITEMS_LENGTH
    )
      return new NotFoundException('Country not found');

    const properFilteredCountry =
      filteredCountryByAbbreviation.length > NO_ITEMS_LENGTH
        ? filteredCountryByAbbreviation
        : filteredCountryByName;

    return properFilteredCountry;
  }
}
