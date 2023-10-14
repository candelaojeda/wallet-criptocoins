<template>
  <div class="body">
    <div id="nav" v-if="$store.state.idUser">
      <router-link to="/actions">Purchase-Sale</router-link> |
      <router-link to="/actual-state">Actual State</router-link> |
      <router-link to="/investments">Investments</router-link>
    </div>
    <div class="user">
      <div class="nickName">
        <p>
          <b>#{{ $store.state.idUser }}</b>
        </p>
      </div>
      <button v-on:click="exit()" class="btnExit"><b>Exit</b></button>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  create() {},
  methods: {
    exit: function () {
      this.$store.commit("modifyIdUser", null);
      this.$router.push("/");
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;500&display=swap");
* {
  margin: 0;
  font-family: "Poppins", sans-serif;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #adb942;
}
.body {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: auto;
  height: auto;
  background-image: url("./assets/background.avif");
  background-size: cover;
  z-index: 0;
}
.user {
  display: flex;
  width: 250px;
  height: 30px;
  margin: 0px auto;
  margin-top: -52px;
  margin-right: 3%;
}
.btnExit {
  width: 100px;
  height: 30px;
  background: none;
  font-size: 12px;
  text-transform: uppercase;
  color: azure;
  letter-spacing: 1px;
  border-radius: 4px;
  border: 1px solid #adb942;
  cursor: pointer;
  text-align: center;
  margin-left: 20px;
  transition: background 0.3s ease-in-out;
}
.btnExit:hover {
  background: #adb942;
  color: #000000;
}
.user p {
  font-size: 14px;
  text-transform: uppercase;
  color: #999;
  letter-spacing: 1px;
}
.nickName {
  margin-top: 6px;
}
#nav {
  display: block;
  align-items: center;
  padding: 20px 15px;
  border-radius: 12px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
#nav a {
  list-style: none;
  margin: 0 10px;
}
#nav a {
  position: relative;
  color: #999;
  font-size: 15px;
  font-weight: 500;
  padding: 6px 0;
  text-decoration: none;
}
#nav a:before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 0%;
  background: #adb942;
  border-radius: 12px;
  transition: all 0.4s ease;
}
#nav a:hover:before {
  width: 100%;
}
</style>
