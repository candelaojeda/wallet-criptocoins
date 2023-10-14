<template>
  <div>
    <div class="container">
      <h1>Investment Analysis</h1>
      <table class="table">
        <thead>
          <tr>
            <th class="tableTitle">CRIPTOCURRENCY</th>
            <th class="tableTitle">RESULT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="tableData">
              <p v-for="coin in wallet" :key="coin.crypto_code">{{ coin.crypto_code }}</p>
            </td>
            <td class="tableData">
              <p v-for="coin in wallet" :key="coin.crypto_code">${{ coin.money }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
  methods: {},
};
</script>
<style scoped>
.container {
  width: 1000px;
  border-radius: 10px;
  box-shadow: 0 3px 25px hsla(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px 30px;
  background: rgba(0, 0, 0, 0.9);
  margin: 10px auto;
  margin-top: 50px;
}
h1 {
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: azure;
  margin-bottom: 40px;
}
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
