import axios from "axios";

const clientApi = axios.create({
  baseURL: "https://criptoya.com/api",
  withCredentials: false,
});

export default {
  getAgenciesInformation(coin) {
    return clientApi.get(`/${coin}/ars/1`);
  },
};
