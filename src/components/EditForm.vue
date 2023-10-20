<template>
  <div class="edit">
    <form action="#" method="post" class="form-style">
      <h2>EDIT TRANSACTION</h2>
      <div class="contentEdit">
        <div class="content-select">
          <select
            id="standard-select"
            v-model="newTransaction.crypto_code"
            @change="getAgencies(newTransaction.crypto_code)"
          >
            <option value="" disabled selected hidden>CRIPTOMONEDA</option>
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
            <option value="" disabled selected hidden>Select agency</option>
            <option v-for="agency in agencies" :key="agency.agency" :value="agency">
              {{ agency.agency.toUpperCase() + " - Price: " + agency.values.totalAsk }}
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
        <div class="content-select">
          <select id="standard-select" v-model="newTransaction.action">
            <option value="">TRANSACTION</option>
            <option value="purchase">PURCHASE</option>
            <option value="sale">SALE</option>
          </select>
          <i></i>
        </div>
        <div class="btnsEdit">
          <button class="btnEdit" type="submit" @click.prevent="editCripto">EDIT</button>
          <button class="btn" type="submit" @click.prevent="cancel">CANCEL</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import TransactionsServices from "@/services/TransactionsServices";
import CryptoServices from "../services/CryptoServices";

export default {
  name: "EditForm",
  data() {
    return {
      newTransaction: {
        user_id: this.$store.state.idUser,
        action: "",
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
  computed: {
    id() {
      return this.$route.query.id;
    },
  },
  mounted() {
    TransactionsServices.getTransactionsById(this.id)
      .then((response) => {
        this.newTransaction = response.data;
      })
      .catch(() => {
        this.$toast.error("Error.");
      });
  },
  methods: {
    cancel() {
      this.$router.push("/history");
    },
    editCripto() {
      if (this.newTransaction.action === "") {
        this.$toast.error("Select an operation.");
      } else if (this.newTransaction.crypto_code === "") {
        this.$toast.error("Select a criptocoin.");
      } else {
        TransactionsServices.modifyTransaction(this.id, this.newTransaction)
          .then(() => {
            this.$toast.info("Successfully edition!");
            this.$router.push("/history");
            this.$store.commit("updateTransaction", this.newTransaction);
          })
          .catch(() => {
            this.$toast.error("Error when making the operation.");
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
      if (this.selectedAgency && this.selectedAgency.values) {
        this.newTransaction.money = (
          this.newTransaction.crypto_amount * this.selectedAgency.values.totalAsk
        ).toFixed(2);
      } else {
        this.newTransaction.money = null;
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
.edit {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}
.form-style {
  border-radius: 10px;
  box-shadow: 0 3px 25px hsla(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  background: rgba(0, 0, 0, 0.9);
}
h2 {
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: azure;
  margin-bottom: 40px;
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
  position: relative;
  margin: 1px auto;
  margin-bottom: 5px;
  width: 600px;
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
.btnsEdit {
  display: flex;
  justify-content: center;
}
.btnEdit {
  width: 200px;
  height: 42px;
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 5px;
  letter-spacing: 1px;
  border-radius: 5px;
  cursor: pointer;
  margin: 40px auto;
  border-style: none;
  background: azure;
  color: #adb942;
  transition: background 0.3s ease-in-out;
}
.btn {
  width: 200px;
  height: 42px;
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 5px;
  letter-spacing: 1px;
  border-radius: 5px;
  cursor: pointer;
  margin: 40px auto;
  border-style: none;
  background: azure;
  color: #adb942;
  transition: background 0.3s ease-in-out;
}
.btnEdit:hover {
  background: #adb942;
  color: azure;
  border-radius: 5px;
}
.btn:hover {
  background: #adb942;
  color: azure;
  border-radius: 5px;
}
</style>
