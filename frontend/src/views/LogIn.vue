<template>
<div class="center">
<div class="container" id="container">
	<div class="form-container sign-up-container">
		<form @submit.prevent="btnSignUp">
			<h1>Create Account</h1>
			<input type="text" placeholder="Account" id="signA" required/>
			<input type="password" placeholder="Password" id="signP" required/>
			<button type="submit">Sign Up</button>
		</form>
	</div>
	<div class="form-container sign-in-container">
		<form @submit.prevent="btnLogIn">
			<h1>Log in</h1>
			<input type="text" placeholder="Account" id="logA" required/>
			<input type="password" placeholder="Password" id="logP" required/>
			<button tyoe="submit">Log In</button>
		</form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p><b>已經有帳號了?來登入頁面吧!</b></p>
				<button class="ghost" id="signIn" @click="signIn()">Log In</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p><b>還沒有建立過帳號嗎?來註冊一個吧!</b></p>
				<button class="ghost" id="signUp"  @click="signUp()">Sign Up</button>
			</div>
		</div>
	</div>
</div>
<div class="mini">
	<div class="mini-form-container">
		<form @submit.prevent="minibtnLogIn">
			<h1>Log in</h1>
			<input type="text" placeholder="Account" id="minilogA" required/>
			<input type="password" placeholder="Password" id="minilogP" required/>
			<button type="submit">Log In</button>
		</form>
	</div>
	<div class="mini-form-container">
		<form @submit.prevent="minibtnSignUp">
			<h1>Create Account</h1>
			<input type="text" placeholder="Account" id="minisignA" required/>
			<input type="password" placeholder="Password" id="minisignP" required/>
			<button type="submit">Sign Up</button>
		</form>
	</div>
</div>
</div>
</template>
<script>
import axios from "axios";
import md5 from "md5";
import Cookies from "js-cookie";
export default{

    data(){
        return{
            signA: '',
            signP: '',
            logA: '',
            logP: '',
			minisignA: '',
            minisignP: '',
            minilogA: '',
        	minilogP: '',
        }
    },
    methods:{
        signUp(){
            document.getElementById('container').classList.add("right-panel-active");
        },
        signIn(){
            document.getElementById('container').classList.remove("right-panel-active");
        },
        btnSignUp(){
			let account = document.getElementById("signA").value;
			let password1 = document.getElementById("signP").value;
			if (!account || !password1) {
				alert("帳號和密碼不得為空");
				return;
			}
			const password = md5(password1);
            const data = { account, password };
			axios
				.post("/api/accounts/signup", data)
				.then((res) => {
				if (res.status === 200) {
					alert("註冊成功!請重新登入");
					window.location.href = "/";
				}
				if (res.status === 201) {
					alert("帳號已經存在");
				}
				})
				.catch((err) => {
				alert("註冊失敗");
				console.log(err);
				});
        },
		btnLogIn(){
			const account = document.getElementById("logA").value;
			const password = document.getElementById("logP").value;
			const data = { account, password };
			if (!account || !password) {
				alert("帳號和密碼不得為空");
				return;
			}
			axios
				.post("/api/login", data, {
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
				withCredentials: true,
				})
				.then((res) => {
				if (res.status === 200) {
					alert("登入成功!");
					Cookies.set("jwt", res.data.token, { expires: 1 });
            		Cookies.set("account", account, { expires: 1 });
					window.location.href = "/";
				}
				})
				.catch((err) => {
				alert("登入失敗");
				console.log(err);
				});
		},
		minibtnSignUp(){
			let account = document.getElementById("minisignA").value;
			let password1 = document.getElementById("minisignP").value;
			if (!account || !password1) {
				alert("帳號和密碼不得為空");
				return;
			}
			const password = md5(password1);
            const data = { account, password };
			axios
				.post("/api/accounts/signup", data)
				.then((res) => {
				if (res.status === 200) {
					alert("註冊成功!請重新登入");
					window.location.href = "/";
				}
				if (res.status === 201) {
					alert("帳號已經存在");
				}
				})
				.catch((err) => {
				alert("註冊失敗");
				console.log(err);
				});
        },
		minibtnLogIn(){
			const account = document.getElementById("minilogA").value;
			const password = document.getElementById("minilogP").value;
			const data = { account, password };
			if (!account || !password) {
				alert("帳號和密碼不得為空");
				return;
			}
			axios
				.post("/api/login", data, {
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
				withCredentials: true,
				})
				.then((res) => {
				if (res.status === 200) {
					alert("登入成功!");
					Cookies.set("jwt", res.data.token, { expires: 1 });
            		Cookies.set("account", account, { expires: 1 });
					window.location.href = "/";
				}
				})
				.catch((err) => {
				alert("登入失敗");
				console.log(err);
				});
		}
    },
}
</script>
<style scoped>
@media(max-width: 600px){
	.mini{
		display: "";	
	}
	.container{
		display: none;
	}
}
@media(min-width: 600px){
	.mini{
		display: none;
	}
	.container{
		display: "";
	}
}

.mini-form-container{
	position: relative;
	height: 50%;
	margin-top: 5%;
}

*{
  margin: 0;
  padding: 0px;
  border: 0px;
  box-sizing: border-box;
}

.center {
	
	justify-content: center;
	align-items: center;
    align-content: center;
    flex-wrap: wrap;
	flex-direction: column;
	font-family: 'segoe ui';
	height: 100vh;
	margin: -20px 0 50px;
    position: relative;
    margin: auto;
}

h1 {
	font-weight: bold;
	margin: 0;
}

p {
	font-size: 14px;
	font-weight: 100;
	line-height: 20px;
	letter-spacing: 0.5px;
	margin: 20px 0 30px;
}

button {
	border-radius: 20px;
	border: 1px solid #dcdddf; 
	background-color: #dcdddf;
	color: #FFFFFF;
	font-size: 12px;
	font-weight: bold;
	padding: 12px 45px;
	letter-spacing: 1px;
	text-transform: uppercase;
	transition: transform 80ms ease-in;
}

button:active {
	transform: scale(0.95);
}

button:focus {
	outline: none;
}

button.ghost {
	background-color: transparent;
	border-color: #FFFFFF;
}

form {
	background-color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 50px;
	height: 100%;
	text-align: center;
}

input {
	background-color: #eee;
	border: none;
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;
}

.container {
	margin-top: 5%;
	background-color: #fff;
	border-radius: 10px;
  	box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
			0 10px 10px rgba(0,0,0,0.22);
	position: relative;
	overflow: hidden;
	width: 768px;
	min-height: 480px;
}

.form-container {
	position: absolute;
	top: 0;
	height: 100%;
	transition: all 0.6s ease-in-out;
}

.sign-in-container {
	left: 0;
	width: 50%;
	z-index: 2;
}

.container.right-panel-active .sign-in-container {
	transform: translateX(100%);
}

.sign-up-container {
	left: 0;
	width: 50%;
	opacity: 0;
	z-index: 1;
}

.container.right-panel-active .sign-up-container {
	transform: translateX(100%);
	opacity: 1;
	z-index: 5;
	animation: show 0.6s;
}

@keyframes show {
	0%, 49.99% {
		opacity: 0;
		z-index: 1;
	}
	
	50%, 100% {
		opacity: 1;
		z-index: 5;
	}
}

.overlay-container {
	position: absolute;
	top: 0;
	left: 50%;
	width: 50%;
	height: 100%;
	overflow: hidden;
	transition: transform 0.6s ease-in-out;
	z-index: 100;
}

.container.right-panel-active .overlay-container{
	transform: translateX(-100%);
}

.overlay {
	background: #becbd3;
	background: -webkit-linear-gradient(to right, #dcdddf, #becbd3);
	background: linear-gradient(to right, #dcdddf, #becbd3);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 0 0;
	color: #FFFFFF;
	position: relative;
	left: -100%;
	height: 100%;
	width: 200%;
  	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  	transform: translateX(50%);
}

.overlay-panel {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 40px;
	text-align: center;
	top: 0;
	height: 100%;
	width: 50%;
	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.overlay-left {
	transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
	transform: translateX(0);
}

.overlay-right {
	right: 0;
	transform: translateX(0);
}

.container.right-panel-active .overlay-right {
	transform: translateX(20%);
}
</style>