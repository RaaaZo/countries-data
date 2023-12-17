import countriesPopulationDensity from '../../database/country-by-population-density.json';
import countriesAbbreviation from '../../database/country-by-abbreviation.json';
import countriesCapital from '../../database/country-by-capital-city.json';
import countriesCurrency from '../../database/country-by-currency-name.json';
import countriesLanguage from '../../database/country-by-languages.json';
import countriesName from '../../database/country-by-name.json';
import countriesPopulation from '../../database/country-by-population.json';
import countriesCurrencyCode from '../../database/country-by-currency-code.json';
import countriesCities from '../../database/country-by-cities.json';
import countriesCoordinates from '../../database/country-by-geo-coordinates.json';

export const createCountriesBulkedData = countriesName.map(({ country }) => {
  const countryCoordinates = countriesCoordinates?.find(
    ({ country: innerCountry }) => country === innerCountry,
  );

  const countryPopulation = countriesPopulation?.find(
    ({ country: innerCountry }) => country === innerCountry,
  )?.population;

  const countryCapital = countriesCapital?.find(
    ({ country: innerCountry }) => country === innerCountry,
  )?.city;

  const countryCurrencyName = countriesCurrency?.find(
    ({ country: innerCountry }) => country === innerCountry,
  )?.currencyName;

  const countryCurrencyCode = countriesCurrencyCode?.find(
    ({ country: innerCountry }) => country === innerCountry,
  )?.currencyCode;

  const countryPopulationDensity = countriesPopulationDensity?.find(
    ({ country: innerCountry }) => country === innerCountry,
  )?.density;

  const countryAbbreviation = countriesAbbreviation?.find(
    ({ country: innerCountry }) => country === innerCountry,
  )?.abbreviation;

  const countryLanguage = countriesLanguage?.find(
    ({ country: innerCountry }) => country === innerCountry,
  )?.languages;

  const countryCities = countriesCities?.find(
    ({ country: innerCountry }) => country === innerCountry,
  )?.cities;

  const mergedData = {
    country,
    population: countryPopulation,
    capital: countryCapital,
    currencyName: countryCurrencyName,
    currencyCode: countryCurrencyCode,
    populationDensity: countryPopulationDensity,
    abbreviation: countryAbbreviation,
    language: countryLanguage,
    cities: countryCities,
    coordinates: {
      north: countryCoordinates?.north,
      south: countryCoordinates?.south,
      west: countryCoordinates?.west,
      east: countryCoordinates?.east,
    },
  };

  return mergedData;
});
