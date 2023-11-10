import { Injectable, NotFoundException } from '@nestjs/common';
import countryByAlphabetLetters from '../database/country-by-alphabet-letters.json';

@Injectable()
export class CountriesByAlphabetLettersService {
  findAll() {
    return countryByAlphabetLetters;
  }

  findOne(alphabetLetter: string) {
    const uppercaseAlphabetLetter = alphabetLetter.toUpperCase();

    const countriesAlphabeticalLetters = Object.keys(
      countryByAlphabetLetters[0],
    );

    if (!countriesAlphabeticalLetters.includes(uppercaseAlphabetLetter))
      return new NotFoundException(
        `Countries with ${uppercaseAlphabetLetter} letter not found`,
      );

    const filteredCountries =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      countryByAlphabetLetters[0]?.[uppercaseAlphabetLetter];

    return filteredCountries;
  }
}
