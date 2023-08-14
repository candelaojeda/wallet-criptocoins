import { createStore } from "vuex";
import TransactionsServices from "./../services/TransactionsServices.js";

export default createStore({
  state: {
    idUser: "",
  },
  getters: {},
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
  },
  actions: {},
  modules: {},
});
