import countries from 'world-countries';

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  }

  const defaultValue = () => {
    return formattedCountries.find((item) => item.value === "VN");
  }

  return {
    getAll,
    getByValue,
    defaultValue
  }
};

export default useCountries;
