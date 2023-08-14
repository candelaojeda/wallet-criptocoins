import axios from "axios";

const clienteAPI = axios.create({
  baseURL: "https://laboratorio3-f36a.restdb.io/rest",
  headers: { "x-apikey": "60eb09146661365596af552f" },
});

export default {
  getTransactions(idUser) {
    return clienteAPI.get(`/transactions?q={"user_id": "${idUser}"}`);
  },
  enterNewTransaction(newTransaction) {
    return clienteAPI.post("/transactions", newTransaction);
  },
};
