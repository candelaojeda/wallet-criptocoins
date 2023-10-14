import { createStore } from "vuex";
import TransactionsServices from "./../services/TransactionsServices.js";

export default createStore({
  state: {
    idUser: "",
    totalMoney: null,
    transactions: [],
  },
  getters: {
    getTransactions: (state) => {
      return state.transactions;
    },
    getCurrentStatus: (state) => {
      const wallet = [];
      state.transactions.forEach((transaction) => {
        const index = wallet.findIndex((element) => element.crypto_code == transaction.crypto_code);
        if (index == -1) {
          if (transaction.action == "sale") {
            const negativeTransaction = transaction;
            negativeTransaction.crypto_amount = -parseFloat(negativeTransaction.crypto_amount);
            negativeTransaction.money = -parseFloat(negativeTransaction.money);
            wallet.push(negativeTransaction);
          } else {
            wallet.push(transaction);
          }
        } else {
          if (transaction.action == "purchase") {
            wallet[index].crypto_amount += parseFloat(transaction.crypto_amount);
            wallet[index].money += parseFloat(transaction.money);
          } else {
            wallet[index].crypto_amount -= parseFloat(transaction.crypto_amount);
            wallet[index].money -= parseFloat(transaction.money);
          }
        }
      });
      return wallet;
    },
  },
  mutations: {
    modifyIdUser(state, idUser) {
      state.idUser = idUser;
    },
    pushTransactions(state) {
      TransactionsServices.getTransactions(state.idUser)
        .then((response) => {
          state.transactions = response.data;
        })
        .catch(() => {
          alert("Error");
        });
    },
    modifyTotalMoneyActualState(state, totalMoney) {
      state.totalMoney = totalMoney;
    },
  },
  actions: {},
  modules: {},
});
