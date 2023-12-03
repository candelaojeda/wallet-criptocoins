<template>
  <div class="purchase">
    <form action="#" method="post">
      <div class="content-select">
        <select
          id="standard-select"
          v-model="newTransaction.crypto_code"
          @change="getAgencies(newTransaction.crypto_code)"
        >
          <option value="" disabled selected hidden>SELECT CRIPTO</option>
          <option value="BTC">BITCOIN</option>
          <option value="ETH">ETHEREUM</option>
          <option value="USDC">USDC</option>
          <option value="USDT">USDT</option>
          <option value="BUSD">BINANCE USD</option>
        </select>
        <i></i>
      </div>
      <div class="content-select">
        <select
          id="standard-select"
          v-model="selectedAgency"
          @change="enableAmount()"
          :disabled="selectAgenciesDisabled"
        >
          <option value="" disabled selected hidden>SELECT AGENCY</option>
          <option v-for="agency in agencies" :key="agency.agency" :value="agency">
            {{ agency.agency.toUpperCase() + " - Purchase price: " + agency.values.totalAsk }}
          </option>
        </select>
        <i></i>
      </div>
      <div class="input">
        <input
          type="number"
          id="cantBuy"
          name="cantBuy"
          v-model="newTransaction.crypto_amount"
          placeholder="QUANTITY TO BUY"
          required
          :disabled="setAmountDisabled"
          @input="calculateAmount()"
        />
        <input
          type="number"
          id="amount"
          name="amount"
          v-model="newTransaction.money"
          placeholder="AMOUNT"
          required
          disabled
        />
      </div>
      <button class="btn" type="submit" @click.prevent="buyCripto">BUY</button>
    </form>
  </div>
</template>

<script>
import TransactionsServices from "./../services/TransactionsServices.js";
import CryptoServices from "./../services/CryptoServices";

export default {
  name: "Purchase",
  data() {
    return {
      newTransaction: {
        user_id: this.$store.state.idUser,
        action: "purchase",
        crypto_code: "",
        crypto_amount: "",
        money: "",
        datetime: "",
      },
      selectedAgency: "",
      agencies: [],
      selectAgenciesDisabled: true,
      setAmountDisabled: true,
    };
  },
  methods: {
    buyCripto() {
      if (this.newTransaction.crypto_amount === "") {
        this.$toast.error("Enter the amount to buy.");
      } else if (!parseFloat(this.newTransaction.crypto_amount)) {
        this.$toast.error("You must enter a numeric value.");
      } else if (parseFloat(this.newTransaction.crypto_amount) <= 0) {
        this.$toast.error("The amount to enter must be greater than 0.");
      } else if (this.newTransaction.money === "") {
        this.$toast.error("The field must not be empty.");
      } else if (!parseFloat(this.newTransaction.money)) {
        this.$toast.error("You must enter a numeric value.");
      } else if (parseFloat(this.newTransaction.money) <= 0) {
        this.$toast.error("The amount to enter must be greater than 0.");
      } else {
        this.newTransaction.datetime = new Date();
        TransactionsServices.enterNewTransaction(this.newTransaction)
          .then(() => {
            this.$toast.info("Successfully!");
            this.$store.commit("pushTransactions");
            this.newTransaction.crypto_code = "";
            this.newTransaction.crypto_amount = "";
            this.newTransaction.money = "";
            this.selectedAgency = "";
          })
          .catch((err) => {
            console.error("Error:", err);
            if (err && err.message) {
              this.$toast.error("Error: " + err.message);
            } else {
              this.$toast.error("An unknown error occurred.");
            }
          });
      }
    },
    getAgencies(cripto) {
      CryptoServices.getAgenciesInformation(cripto)
        .then((res) => {
          this.agencies = Object.keys(res.data).map((agency, index) => {
            return { agency: agency, values: Object.values(res.data)[index] };
          });
          this.selectAgenciesDisabled = false;
        })
        .catch();
    },
    enableAmount() {
      this.setAmountDisabled = false;
    },
    calculateAmount() {
      const enteredValue = parseFloat(this.newTransaction.crypto_amount);

      if (isNaN(enteredValue) || enteredValue <= 0) {
        this.newTransaction.money = "";
        this.$toast.error("The quantity must be greater than 0.");
      } else {
        this.newTransaction.money = (enteredValue * this.selectedAgency.values.totalAsk).toFixed(2);
      }
    },
  },
};
</script>
<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}
.content-select select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
.content-select select::-ms-expand {
  display: none;
}
.content-select select option {
  color: #adb942;
  font-size: 15px;
  font-weight: normal;
  background: rgba(0, 0, 0, 0.9);
}
.content-select {
  max-width: 100%;
  position: relative;
  margin: 1px auto;
  margin-bottom: 5px;
}
.content-select select {
  display: inline-block;
  width: 100%;
  cursor: pointer;
  padding: 7px 10px;
  height: 42px;
  outline: 0;
  border: 0;
  background: rgba(0, 0, 0, 0.9);
  font-size: 1em;
  color: #adb942;
  font-family: "Quicksand", sans-serif;
  border-radius: 5px;
  transition: all 0.25s ease;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
}
.content-select i {
  position: absolute;
  right: 20px;
  top: calc(50% - 13px);
  width: 12px;
  height: 12px;
  display: block;
  border-left: 4px solid #adb942;
  border-bottom: 4px solid #adb942;
  transform: rotate(-45deg);
  transition: all 0.25s ease;
}
.content-select:hover i {
  margin-top: 3px;
}
.input {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
}
input {
  border-style: none;
  margin-bottom: 15px;
  height: 42px;
  border-radius: 4px;
  background: #adb942;
  font-size: 16px;
  padding-left: 10px;
}
input:focus {
  outline: none;
  border: 1px solid #adb942;
  box-shadow: 0 0 2px #adb942;
}
.btn {
  width: 150px;
  height: 42px;
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 5px;
  letter-spacing: 1px;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px auto;
  border-color: #adb942;
  background: none;
  color: azure;
  transition: background 0.3s ease-in-out;
}
.btn:hover {
  background: #adb942;
  color: #000000;
  border-radius: 5px;
}
</style>
