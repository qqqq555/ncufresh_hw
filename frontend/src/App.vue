<template>
  <div class="nav">
  <input type="checkbox" id="nav-check">
  <div class="nav-header">
    <div class="nav-title">
      ncufresh_hw
    </div>
  </div>
  <div class="nav-btn">
    <label for="nav-check">
      <span></span>
      <span></span>
      <span></span>
    </label>
  </div>
  <div class="nav-links">
    <router-link to="/">所有文章</router-link>
    <router-link to="/mypost" v-if="logStatus">我的文章</router-link>
    <router-link to="/login" v-if="!logStatus">註冊/登入</router-link>
    <button v-if="logStatus" @click="logOut">登出</button>
  </div>
</div>
<RouterView></RouterView>
</template>
<script>
import { ref, onMounted } from "vue";
import Cookies  from "js-cookie";
import axios from "axios";
export default{
  setup(){
    const logStatus = ref(false);
    onMounted(() => {
      if (Cookies.get("jwt")) {
        logStatus.value = true;
      }
      else {
        logStatus.value = false;
      }
    });
    const logOut = () =>{
      if (Cookies.get("jwt")) {
        Cookies.remove("jwt");
        Cookies.remove("account");
        logStatus.value = false;
      } 
    };
    return {logStatus, logOut};
  },
  method:{
    logOut(){
      axios
        .get("http://localhost:3000/logout")
        .catch((err) =>{
          console.log(err);
        })
    }
  }
};
</script>
<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css";
*{
  margin: 0;
  padding: 0px;
  border: 0px;
  box-sizing: border-box;
}
.nav {
  height: 50px;
  width: 100%;
  background-color: #8e9aa8;
  position: relative;
  margin: 0px;
  font-family: 'segoe ui';
}

.nav > .nav-header {
  display: inline;
}

.nav > .nav-header > .nav-title {
  display: inline-block;
  font-size: 22px;
  color: #fff;
  padding: 10px 10px 10px 10px;
}

.nav > .nav-btn {
  display: none;
}

.nav > .nav-links {
  display: inline;
  float: right;
  font-size: 18px;
}

.nav > .nav-links > a {
  display: inline-block;
  padding: 13px 10px 13px 10px;
  text-decoration: none;
  color: #fff;
}

.nav > .nav-links > a:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

.nav > #nav-check {
  display: none;
}

@media (max-width:600px) {
  .nav > .nav-btn {
    display: inline-block;
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .nav > .nav-btn > label {
    display: inline-block;
    width: 50px;
    height: 50px;
    padding: 13px;
  }
  .nav > .nav-btn > label:hover,.nav  #nav-check:checked ~ .nav-btn > label {
    background-color: rgba(0, 0, 0, 0.3);
  }
  .nav > .nav-btn > label > span {
    display: block;
    width: 25px;
    height: 10px;
    border-top: 2px solid #eee;
  }
  .nav > .nav-links {
    position: absolute;
    display: block;
    width: 100%;
    background-color: #333;
    height: 0px;
    transition: all 0.3s ease-in;
    overflow-y: hidden;
    top: 50px;
    left: 0px;
  }
  .nav > .nav-links > a {
    display: block;
    width: 100%;
  }
  .nav > #nav-check:not(:checked) ~ .nav-links {
    height: 0px;
  }
  .nav > #nav-check:checked ~ .nav-links {
    height: calc(100vh - 50px);
    overflow-y: auto;
  }
}
</style>