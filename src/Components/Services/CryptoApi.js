const BASE_URL = "https://api.coingecko.com/api/v3";
const API_TOKEN = "x_cg_demo_api_key=CG-uoTUfA2UqhFcmsTYyrtXgoDC";
const CryptoData = (page, Currencies, selectValue) => {
  return `${BASE_URL}/coins/markets?vs_currency=${Currencies}&per_page=${selectValue}&page=${page}&locale=en&${API_TOKEN}`;
};
const AllCryptos = () => {
  return `${BASE_URL}/coins/list?status=active&locale=en&${API_TOKEN}`;
};
const SearchedCryptos = (Searched) => {
  return `${BASE_URL}/search?query=${Searched}&locale=en&${API_TOKEN}`;
};
export { CryptoData, AllCryptos ,SearchedCryptos};
