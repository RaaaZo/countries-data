import { Injectable } from '@nestjs/common';
import countriesByLanguages from '../database/country-by-languages.json';

type TFindAllCountriesByLanguagesParams = {
  countryName?: string;
  languageName?: string;
};

@Injectable()
export class CountriesByLanguagesService {
  findAll({ countryName, languageName }: TFindAllCountriesByLanguagesParams) {
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

    return filteredCountries;
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
