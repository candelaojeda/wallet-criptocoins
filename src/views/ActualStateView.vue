<template>
  <div>
    <div class="information">
      <div class="details">
        <h1>Current state information</h1>
        <div class="description">
          <p>
            This is the current state of your finances. In this table you can see the
            cryptocurrencies you have, their amount and how much money it represents. You can also
            see the total amount of money you have.
          </p>
        </div>
        <TableActualState />
      </div>
    </div>
  </div>
</template>
<script>
import TableActualState from "@/components/TableActualState.vue";

export default {
  name: "ActualState",
  components: { TableActualState },
};
</script>

<style scoped>
.information {
  width: 1000px;
  border-radius: 10px;
  box-shadow: 0 3px 25px hsla(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  padding: 30px 30px;
  background: rgba(0, 0, 0, 0.9);
  margin: 10px auto;
  margin-top: 50px;
}
.details h1 {
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: azure;
  margin-bottom: 40px;
}
.description {
  font-size: 16px;
  letter-spacing: 1px;
  line-height: 1.3em;
  margin: 10px 0 40px;
  color: #9e9a68;
  max-width: 1000px;
  text-align: center;
}
</style>
