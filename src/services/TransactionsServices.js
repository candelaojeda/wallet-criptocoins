import axios from "axios";

const clienteAPI = axios.create({
  baseURL: "https://labor3-d60e.restdb.io/rest",
  headers: { "x-apikey": "64a2e9bc86d8c525a3ed8f63" },
});

export default {
  getTransactions(idUser) {
    return clienteAPI.get(`/transactions?q={"user_id": "${idUser}"}`);
  },
  enterNewTransaction(newTransaction) {
    return clienteAPI.post("/transactions", newTransaction);
  },
  deleteTransaction(id) {
    return clienteAPI.delete(`/transactions/${id}`);
  },
  getTransactionsById(id) {
    return clienteAPI.get(`/transactions/${id}`);
  },
  modifyTransaction(id, editTransaction) {
    return clienteAPI.patch(`/transactions/${id}`, editTransaction);
  },
};
