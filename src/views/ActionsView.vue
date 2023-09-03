<template>
  <div class="containerActions">
    <div class="purchase-sale">
      <div class="purchase">
        <h1>Purchase</h1>
        <Purchase />
      </div>
      <div class="sale">
        <h1>Sale</h1>
        <Sale />
      </div>
    </div>
    <button v-on:click="history()" type="submit" class="btnHistory">
      <b>History</b>
    </button>
  </div>
</template>
<script>
import Purchase from "@/components/Purchase.vue";
import Sale from "@/components/Sale.vue";

export default {
  name: "ActionsView",
  components: { Purchase, Sale },
  data() {
    return {};
  },
  methods: {
    history: function () {
      this.$router.push("/history");
    },
  },
};
</script>
<style scoped>
.containerActions {
  margin-top: 50px;
}
.purchase-sale {
  z-index: 1;
  width: 850px;
  border-radius: 10px;
  box-shadow: 0 3px 25px hsla(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  border: solid 4px #adb942;
  padding: 30px 30px;
  background: rgba(0, 0, 0, 0.9);
  margin: 10px auto;
  margin-top: 20px;
}
.purchase,
.sale {
  width: 100%;
  padding: 10px 10px;
  align-items: center;
}
.purchase h1,
.sale h1 {
  font-size: 15px;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: #999;
  margin-bottom: 40px;
}
.sale {
  border-left: solid 1px #adb942;
}
.btn:hover,
.btnHistory:hover {
  background: azure;
  color: #adb942;
  border-radius: 5px;
}
.btnHistory {
  width: 15%;
  height: 48px;
  background: #adb942;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: azure;
  letter-spacing: 1px;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px auto;
  border-style: none;
  transition: background 0.3s ease-in-out;
}
</style>
