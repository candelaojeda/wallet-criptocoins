<template>
  <div>
    <div v-if="showWelcomeMessage" class="welcome-message">
      <span style="font-size: 100px">&#128075;</span>
      <p>WELCOME TO YOUR VIRTUAL WALLET {{ $store.state.idUser }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showWelcomeMessage: false,
    };
  },
  mounted() {
    this.showWelcomeMessage = true;
    setTimeout(() => {
      this.showWelcomeMessage = false;
      this.$router.push("/actions");
    }, 3000);
  },
};
</script>

<style scope>
.welcome-message {
  background: rgba(0, 0, 0, 0.9);
  color: #adb942;
  width: 600px;
  height: 300px;
  font-weight: 900;
  border: solid 5px #adb942;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.welcome-message p {
  font-size: 25px;
  padding: 10px 10px 15px 10px;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: #999;
}
</style>
