<template>
<div class="center">
<div class="container" id="container">
	<div class="form-container sign-up-container">
		<form @submit.prevent="btnSignUp">
			<h1>Create Account</h1>
			<input type="text" placeholder="Account" v-model="signA" required/>
			<input type="password" placeholder="Password" v-model="signP" required/>
			<button type="submit">Sign Up</button>
		</form>
	</div>
	<div class="form-container sign-in-container">
		<form action="#">
			<h1>Log in</h1>
			<input type="text" placeholder="Account" v-model="logA" required/>
			<input type="password" placeholder="Password" v-model="logP" required/>
			<button>Log In</button>
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
</div>
</template>
<script>
export default{

    data(){
        return{
            signA: '',
            signP: '',
            logA: '',
            logP: '',
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
            axios.post('http://localhost:3000/signup',{
                signA: this.signA,
                signP: this.signP,
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
            window.alert("註冊成功!"); 
        }
    },
}
</script>
<style scoped>
* {
	box-sizing: border-box;
}

.center {
	display: flex;
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
	background-color: #fff;
	border-radius: 10px;
  	box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
			0 10px 10px rgba(0,0,0,0.22);
	position: relative;
	overflow: hidden;
	width: 768px;
	max-width: 100%;
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