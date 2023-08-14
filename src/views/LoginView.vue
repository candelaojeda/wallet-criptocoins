<template>
  <div class="login-container">
    <div class="login">
      <form class="form" method="post">
        <div class="header">
          <p>Virtual Wallet Criptocoins</p>
        </div>
        <div class="description">
          <p>
            Data of your purchases and sales of cryptocurrencies. Access bitcoins and other digital
            assets. <br />
            Manage your funds.
          </p>
        </div>

        <div class="input">
          <input
            type="text"
            class="inputId"
            id="idUser"
            name="idUser"
            placeholder="Enter your ID"
            v-model="idUser"
          />
          <input type="button" class="button" id="submit" value="GO!" v-on:click="enter()" />
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      idUser: "",
    };
  },
  methods: {
    enter: function () {
      if (this.idUser === "") {
        this.$toast.error("Error! Ingrese su ID de usuario");
      } else {
        if (this.idUser.length > 20) {
          this.$toast.error("Error! El ID de usuario no debe contener más de 20 caracteres");
        } else {
          this.$store.commit("modifyIdUser", this.idUser);
          this.$store.commit("pushTransactions");
          this.$router.push("/actions");
        }
      }
    },
  },
};
</script>
<style scoped>
form {
  width: 450px;
  margin: 10% auto;
  background: rgba(0, 0, 0, 0.9);
  padding: 15px;
  border-radius: 5px;
  border: solid 4px #adb942;
}
.header {
  font-size: 35px;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: azure;
}
.description {
  font-size: 14px;
  letter-spacing: 1px;
  line-height: 1.3em;
  margin: 10px 0 40px;
  color: #9e9a68;
}
.input {
  display: flex;
  align-items: center;
}
.inputId {
  height: 44px;
  border: none;
}
.button {
  height: 44px;
  border: none;
}
#idUser {
  width: 75%;
  background: rgba(0, 0, 0, 0.6);
  font-family: inherit;
  color: #fdfcfb;
  letter-spacing: 1px;
  text-indent: 5%;
  border-radius: 5px 0 0 5px;
}
#submit {
  width: 25%;
  height: 48px;
  background: #adb942;
  font-family: inherit;
  font-weight: bold;
  font-size: 20px;
  color: inherit;
  letter-spacing: 1px;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}
#submit:hover {
  background: darken(#adb942, 5%);
}
input:focus {
  outline: none;
  border-radius: 1px solid #adb942;
  box-shadow: 0 0 2px #adb942;
}
.input a {
  font-weight: bold;
  color: #2c3e50;
}
#submit:hover {
  color: #adb942;
  background-color: azure;
}
</style>
