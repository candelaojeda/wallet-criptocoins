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
        <tr v-for="data in tableData" :key="data._id">
          <td class="tableData">{{ data.crypto_code }}</td>
          <td class="tableData">{{ data.crypto_amount }}</td>
          <td class="tableData">{{ data.money }}</td>
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
import CryptoServices from "@/services/CryptoServices";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      totalMoney: 0,
      tableData: [],
    };
  },
  computed: {
    ...mapGetters({
      wallet: "getCurrentStatus",
    }),
  },
  methods: {
    history: function () {
      this.$router.push("/history");
    },
    calculateTotal() {
      return this.tableData
        .reduce((total, data) => {
          return total + data.money;
        }, 0)
        .toFixed(2);
    },
  },
  mounted() {
    const cryptoData = {};

    this.wallet.forEach((coin) => {
      if (!cryptoData[coin.crypto_code]) {
        cryptoData[coin.crypto_code] = {
          crypto_amount: 0,
          money: 0,
          actualPrice: 0,
        };
      }

      const actionMultiplier = coin.action === "purchase" ? 1 : -1;
      cryptoData[coin.crypto_code].crypto_amount +=
        actionMultiplier * parseFloat(coin.crypto_amount);
      cryptoData[coin.crypto_code].money += actionMultiplier * parseFloat(coin.money);
    });

    Object.keys(cryptoData).forEach((cryptoCode) => {
      const data = cryptoData[cryptoCode];
      if (data.crypto_amount > 0) {
        CryptoServices.getPriceCoin(cryptoCode)
          .then((rta) => {
            const cryptoEntry = {
              crypto_code: cryptoCode,
              crypto_amount: data.crypto_amount,
              money: data.money,
              actualPrice: rta.data.totalBid,
            };
            this.tableData.push(cryptoEntry);
            this.totalMoney += parseFloat(data.crypto_amount * cryptoEntry.actualPrice);
          })
          .catch(() => {
            this.$toast.error("Error al cargar los Datos");
          });
      }
    });
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
