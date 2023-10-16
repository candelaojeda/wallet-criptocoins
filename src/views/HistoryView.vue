<template>
  <div class="body">
    <h1>History information</h1>
    <div class="description">
      <p>On this screen you can see all the movements of your cryptocurrencies.</p>
    </div>
    <div class="container">
      <table v-show="table">
        <thead>
          <tr>
            <th>CRIPTO</th>
            <th>QUANTITY</th>
            <th>PRICE</th>
            <th>OPERATION</th>
            <th>DATE</th>
            <th>TIME</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="transaction in transactions"
            :key="transaction._id"
            :class="{ selected: selectableRow === transaction._id }"
          >
            <td>{{ transaction.crypto_code }}</td>
            <td>{{ transaction.crypto_amount }}</td>
            <td>$ {{ calculateMoney(transaction) }}</td>
            <td>{{ transaction.action }}</td>
            <td>{{ time(transaction.datetime).date }}</td>
            <td>{{ time(transaction.datetime).time }}</td>
            <td class="iconsContainer">
              <div class="icon">
                <router-link :to="{ name: 'EditForm', query: { id: selectableRow } }">
                  <span @click="($event) => row(transaction._id)"
                    ><Edit width="20px" height="20px" fill="#adb942" />
                  </span>
                </router-link>
              </div>
              <div class="icon">
                <label @click="deleteRow(transaction._id)" class="editTransaction"
                  ><Delete width="20px" height="20px" fill="#adb942"
                /></label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button class="btnBack" v-show="enter" @click="enter">BACK</button>
      </div>
    </div>
  </div>
</template>
<script>
import TransactionsServices from "@/services/TransactionsServices";
import { mapGetters } from "vuex";
import Delete from "@/assets/icons/delete";
import Edit from "@/assets/icons/edit";

export default {
  name: "History",
  components: {
    Delete,
    Edit,
  },
  data() {
    return {
      countTransaction: 0,
      table: true,
      edit: false,
      selectableRow: null,
    };
  },
  props: {},
  computed: {
    ...mapGetters({
      transactions: "getTransactions",
    }),
  },
  methods: {
    calculateMoney(coin) {
      const money = parseFloat(coin.crypto_amount) * parseFloat(coin.money);
      return money.toFixed(2);
    },
    enter() {
      this.$router.push("/actions");
    },
    time(datetime) {
      const date = new Date(datetime).toLocaleDateString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      const time = new Date(datetime).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      return { date, time };
    },
    deleteRow(id) {
      if (confirm("Do you want to delete the selected row?")) {
        TransactionsServices.deleteTransaction(id)
          .then(() => {
            this.$toast.info("Succefully delete!");
            this.$store.commit("pushTransactions");
          })
          .catch((err) => {
            this.$toast.error(`Error: ${err}`);
          });
      }
    },
    row(id) {
      if (this.selectableRow !== id) {
        this.selectableRow = id;
      } else {
        this.selectableRow = null;
      }
    },
  },
};
</script>
<style scoped>
.body {
  margin-top: 80px;
}
.container {
  width: 1000px;
  box-shadow: 0 3px 25px hsla(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  border-top: solid 4px #adb942;
  border-bottom: solid 4px #adb942;
  padding: 30px 30px;
  background: rgba(0, 0, 0, 0.9);
  margin: 10px auto;
  margin-top: 10px;
}
th {
  color: #adb942;
  padding-bottom: 10px;
}
td {
  color: #a0a0a0;
}
.btn:hover,
.btnBack:hover {
  background: azure;
  color: #000000;
  border-radius: 5px;
}
.btnBack {
  width: 15%;
  height: 48px;
  background: #adb942;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: #000000;
  letter-spacing: 1px;
  border-radius: 5px;
  cursor: pointer;
  margin: 50px 0px 10px 0px;
  border-style: none;
  transition: background 0.3s ease-in-out;
}
::-webkit-scrollbar {
  width: 14px;
}

::-webkit-scrollbar-track {
  background: #adb942;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 26px;
}
.iconsContainer {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  text-align: center;
  justify-content: center;
}
.icon {
  margin-right: 5px;
  margin-left: 5px;
  cursor: pointer;
}
.editTransaction {
  cursor: pointer;
}
h1 {
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: azure;
  margin-bottom: 40px;
  margin-top: 40px;
}
.description {
  font-size: 16px;
  letter-spacing: 1px;
  line-height: 1.3em;
  margin: 30px 0 40px;
  color: #9e9a68;
  text-align: center;
  align-content: center;
}
</style>
