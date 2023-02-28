<template>
  <nav class="navbar navbar-expand-xl navbar-dark" style="background-color: #8e9aa8;">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">ncufresh_hw</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="title">所有文章</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/mypost" v-if="logStatus" class="title">我的文章</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" v-if="!logStatus" class="title">註冊/登入</router-link>
          </li>
          <li class="nav-item">
            <button v-if="logStatus" @click="logOut" class="log">登出</button>
          </li> 
        </ul>
      </div>
    </div>
  </nav>
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
  font-family: 'Segoe UI';
}

.navbar-brand{
  font-size: 23px;
  width: 75%;
}
.navbar-nav{
  font-size: 23px;
}
.nav-item{
  margin-left: 10px;
}
.title{
  color: #fff;
  text-decoration: none;
}
.nav-item:hover{
  background-color: #717b86;
}
.log{
  color: #fff;
  background-color: #8e9aa8;
}
.log:hover{
  background-color: #717b86;
}
</style>