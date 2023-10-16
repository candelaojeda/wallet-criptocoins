<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th class="tableTitle">CRIPTOCURRENCY</th>
          <th class="tableTitle">QUANTITY</th>
          <th class="tableTitle">MONEY</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(coin, index) in wallet" :key="index">
          <td class="tableData">{{ coin.crypto_code }}</td>
          <td class="tableData">{{ coin.crypto_amount }}</td>
          <td class="tableData">${{ calculateMoney(coin) }}</td>
        </tr>
        <tr>
          <td class="tableTitleTotal">
            <p>TOTAL</p>
          </td>
          <td class="tableData"><p></p></td>
          <td class="tableDataTotal">
            <p>${{ calculateTotal() }}</p>
          </td>
        </tr>
      </tbody>
    </table>
    <button v-on:click="history()" type="submit" class="btnHistory">
      <b>Check history</b>
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      wallet: "getCurrentStatus",
    }),
  },
  methods: {
    history: function () {
      this.$router.push("/history");
    },
    calculateMoney(coin) {
      const cryptoAmount = parseFloat(coin.crypto_amount);
      const money = parseFloat(coin.money);
      return (cryptoAmount * money).toFixed(2);
    },
    calculateTotal() {
      let cryptoTotals = {};

      for (const coin of this.wallet) {
        const cryptoCode = coin.crypto_code;
        const cryptoAmount = parseFloat(coin.crypto_amount);
        const money = parseFloat(coin.money);

        if (cryptoCode in cryptoTotals) {
          cryptoTotals[cryptoCode].quantity += cryptoAmount;
          cryptoTotals[cryptoCode].totalMoney += money;
        } else {
          cryptoTotals[cryptoCode] = {
            quantity: cryptoAmount,
            totalMoney: money,
          };
        }
      }

      let total = 0;

      for (const cryptoCode in cryptoTotals) {
        total += cryptoTotals[cryptoCode].totalMoney;
      }

      return total.toFixed(2);
    },
  },
};
</script>
<style scoped>
.table {
  border-collapse: collapse;
  border-spacing: 0;
}
.table td {
  border-color: azure;
  color: azure;
  border-style: solid;
  border-width: 2px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  overflow: hidden;
  padding: 10px 13px;
  word-break: normal;
}
.table th {
  border-color: azure;
  color: azure;
  border-style: solid;
  border-width: 2px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: normal;
  overflow: hidden;
  padding: 10px 13px;
  word-break: normal;
  width: 3200px;
}
.table .tableTitle {
  border-color: #adb942;
  color: azure;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
}
.table .tableTitleTotal {
  border-color: #adb942;
  color: azure;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  font-size: 22px;
}
.table .tableData {
  border-color: #adb942;
  color: azure;
  text-align: center;
  vertical-align: middle;
}
.tableData {
  font-weight: bold;
}
.table .tableDataTotal {
  border-color: #adb942;
  color: azure;
  text-align: center;
  vertical-align: middle;
  font-size: 30px;
}
.btn:hover,
.btnHistory:hover {
  background: azure;
  color: #adb942;
  border-radius: 5px;
}
.btnHistory {
  width: 200px;
  height: 48px;
  background: #adb942;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: azure;
  letter-spacing: 1px;
  border-radius: 5px;
  cursor: pointer;
  margin: 40px auto;
  border-style: none;
  transition: background 0.3s ease-in-out;
}
</style>
