import { Injectable } from '@nestjs/common';
import countriesByLanguages from '../database/country-by-languages.json';
import { TPaginationParams } from 'src/common/types/pagination';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/common/constants/pagination';
import { transformIntoPaginatedChunk } from 'src/common/utils/transformIntoPaginatedChunk';

type TFindAllCountriesByLanguagesParams = TPaginationParams & {
  countryName?: string;
  languageName?: string;
};

@Injectable()
export class CountriesByLanguagesService {
  findAll({
    countryName,
    languageName,
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
  }: TFindAllCountriesByLanguagesParams) {
    let filteredCountries = countriesByLanguages;

    if (countryName) {
      filteredCountries = countriesByLanguages.filter(({ country }) =>
        country.toLowerCase().includes(countryName.toLowerCase()),
      );
    }

    if (languageName) {
      filteredCountries = countriesByLanguages.filter(({ languages }) =>
        languages.some((name) =>
          name.toLowerCase().includes(languageName.toLowerCase()),
        ),
      );
    }

    const paginatedData = transformIntoPaginatedChunk(
      filteredCountries,
      page,
      limit,
    );

    return paginatedData;
  }

  findOne(countryNameOrLanguageName: string) {
    const filteredCountryByLanguages = countriesByLanguages.filter(
      ({ country, languages }) => {
        const isCountry =
          country.toLowerCase() === countryNameOrLanguageName.toLowerCase();
        const isLanguage = languages.some((name) =>
          name.toLowerCase().includes(countryNameOrLanguageName.toLowerCase()),
        );

        return isCountry || isLanguage;
      },
    );

    return filteredCountryByLanguages;
  }
}
