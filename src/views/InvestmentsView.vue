<template>
  <div class="container">
    <div class="content-description">
      <h1>Investment Analysis</h1>
      <div class="description">
        <p>On this screen you can see the results of your investments.</p>
      </div>
    </div>
    <div v-if="wallet && wallet.length > 0">
      <table class="table">
        <thead>
          <tr>
            <th class="tableTitle">CRIPTOCURRENCY</th>
            <th class="tableTitle">RESULT</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(coin, index) in wallet" :key="coin.crypto_code">
            <td class="tableData">{{ coin.crypto_code }}</td>
            <td class="tableData">${{ coinValues[index] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p class="pharagraph">
        You have no transactions made, the investment analysis cannot yet be controlled.
      </p>
    </div>
  </div>
</template>

<script>
import CryptoServices from "@/services/CryptoServices";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      transactions: null,
      coinValues: [],
    };
  },
  computed: {
    ...mapGetters({
      wallet: "getCurrentStatus",
    }),
  },
  mounted() {
    const cryptoData = {};

    this.wallet.forEach((coin) => {
      cryptoData[coin.crypto_code] = {
        crypto_amount: coin.crypto_amount,
        money: parseFloat(coin.money),
        actualPrice: 0,
      };
    });
    Object.keys(cryptoData).forEach((cryptoCode) => {
      const data = cryptoData[cryptoCode];
      if (data.crypto_amount > 0) {
        CryptoServices.getPriceCoin(cryptoCode)
          .then((rta) => {
            data.actualPrice = rta.data.totalBid;
            const currentValue = data.crypto_amount * data.actualPrice;

            const difference = ((data.money - currentValue) * -1).toFixed(2);
            this.coinValues.push(difference);
          })
          .catch(() => {
            this.$toast.error("Error.");
          });
      }

      if ((data.crypto_amount = 0)) {
        return `${data.money * -1}`;
      }
    });
  },
  methods: {},
};
</script>
<style scoped>
.content-description {
  margin: 50px 50px 0px 50px;
  padding: 0px 30px 30px 30px;
}
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
}
h1 {
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: azure;
  margin-bottom: 10px;
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
  font-size: 22px;
  overflow: hidden;
  padding: 10px 13px;
  word-break: normal;
}
.table th {
  width: 450px;
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
  color: #adb942;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  font-size: 23px;
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
.tableData p {
  font-size: 22px;
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
.pharagraph {
  background: #adb942;
  color: #000000;
  border-radius: 4px;
  padding: 5px;
}
</style>
