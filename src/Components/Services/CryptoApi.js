const BASE_URL = "https://api.coingecko.com/api/v3/coins";
const API_TOKEN = "x_cg_demo_api_key=CG-uoTUfA2UqhFcmsTYyrtXgoDC";
const CryptoData = (page, Currencies, selectValue) => {
  return `${BASE_URL}/markets?vs_currency=${Currencies}&per_page=${selectValue}&page=${page}&locale=en&${API_TOKEN}`;
};
const AllCryptos = () => {
  return `${BASE_URL}/list?status=active&locale=en&${API_TOKEN}`;
};
export { CryptoData, AllCryptos };
