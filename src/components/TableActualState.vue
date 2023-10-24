<template>
  <div v-if="wallet && wallet.length > 0">
    <table class="table">
      <thead>
        <tr>
          <th class="tableTitle">CRIPTOCURRENCY</th>
          <th class="tableTitle">QUANTITY</th>
          <th class="tableTitle">MONEY CRIPTO YA</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(coin, index) in wallet.filter((coin) => coin.crypto_amount > 0)"
          :key="coin.crypto_code"
        >
          <td class="tableData">{{ coin.crypto_code }}</td>
          <td class="tableData">{{ coin.crypto_amount }}</td>
          <td class="tableData">{{ coinValues[index] }}</td>
        </tr>
        <tr>
          <td class="tableTitleTotal">
            <p>TOTAL</p>
          </td>
          <td class="tableData"><p></p></td>
          <td class="tableDataTotal">
            <p>${{ currentTotalMoney.toFixed(2) }}</p>
          </td>
        </tr>
      </tbody>
    </table>
    <button v-on:click="history()" type="submit" class="btnHistory">
      <b>Check history</b>
    </button>
  </div>
  <div v-else>
    <p class="pharagraph">
      You have no transactions made, the current status cannot yet be analyzed.
    </p>
  </div>
</template>

<script>
import CryptoServices from "@/services/CryptoServices";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      totalMoney: 0,
      currentTotalMoney: 0,
      coinValues: [],
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
  },
  mounted() {
    const cryptoData = {};

    this.wallet.forEach((coin) => {
      cryptoData[coin.crypto_code] = {
        crypto_amount: coin.crypto_amount,
        money: parseFloat(coin.money),
        actualPrice: 0,
      };

      this.totalMoney += parseFloat(coin.money);
    });

    Object.keys(cryptoData).forEach((cryptoCode) => {
      const data = cryptoData[cryptoCode];
      if (data.crypto_amount > 0) {
        CryptoServices.getPriceCoin(cryptoCode)
          .then((rta) => {
            data.actualPrice = rta.data.totalBid;
            const currentValue = data.crypto_amount * data.actualPrice;
            this.coinValues.push(currentValue);
            this.currentTotalMoney += currentValue;
          })
          .catch(() => {
            this.$toast.error("Error.");
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
  color: #adb942;
  font-size: 23px;
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
.pharagraph {
  background: #adb942;
  color: #000000;
  border-radius: 4px;
  padding: 5px;
}
</style>
