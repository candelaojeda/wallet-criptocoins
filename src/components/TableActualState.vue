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
        <tr>
          <td class="tableData">
            <p v-for="coin in wallet" :key="coin.crypto_code">{{ coin.crypto_code }}</p>
          </td>
          <td class="tableData">
            <p v-for="coin in wallet" :key="coin.crypto_code">{{ coin.crypto_amount }}</p>
          </td>
          <td class="tableData">
            <p v-for="coin in wallet" :key="coin.crypto_code">${{ coin.money }}</p>
          </td>
        </tr>
        <tr>
          <td class="tableTitle">
            <p>TOTAL</p>
          </td>
          <td class="tableData"><p></p></td>
          <td class="tableData">
            <p>${{ calculateTotal() }}</p>
          </td>
        </tr>
      </tbody>
    </table>
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
    calculateTotal() {
      let total = 0;
      for (const coin of this.wallet) {
        total += parseFloat(coin.money);
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
}
.table .tableTitle {
  border-color: #adb942;
  color: azure;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
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
</style>
