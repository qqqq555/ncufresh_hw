<template>
    <div class="center">
    <br>
    <b class="title">新增文章</b>
    <div class="line"></div>
    <form>
        <p>標題：</p>
        <input v-model="title" type="text" id="title" name="title" required>
        <p>內容：</p>
        <textarea v-model="words" id="words" name="words" required></textarea>
        <br>
        <button type="submit" @click="post">送出</button>
    </form>
    <br>
    <b class="title">編輯文章</b>
    <div class="line"></div>
    <div v-for="article in articles" :key="article.id">
        <br>
        <b class="littleTitle">{{ article.title }}</b>
        <p>{{ article.words }}</p>
    </div>
    </div>
</template>
<script>
import axios from "axios";
import Cookies from "js-cookie";
import { useRoute } from "vue-router";
export default{
    data(){
        return{
            title:'請輸入標題',
            words:'請輸入內容',
            articles:[],
        }
    },
    setup(){
        
        const post = async () => {
            try {
                const res = await axios.post(
                    'http://localhost:3000/articles/post',
                    {
                        title: title.value,
                        words: words.value,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            authorization: "Bearer " + Cookies.get("jwt"),
                        },
                    }
                );
                console.log(res.data);
            } catch(err){
                console.log(err);
                alert("發文失敗");
            }
        };
        return { post };
    },
    created(){
        const route = useRoute();
        axios.get('http://localhost:3000/articles/'+ Cookies.get("account"))
            .then(response => {
                this.articles = response.data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
};
</script>
<style scoped>
*{
    box-sizing: border-box;
}
.title{
    font-size: 30px;
    color: #8E9BAE;
    text-align: left;
}
.littleTitle{
    font-size: 28px;
    color: #8592a2;
}
.line{
    width: 70%;
    height: 1px;
    border-top: solid #8E9BAE;
}
.center{
    display: flex;
    flex-wrap: wrap;
	flex-direction: column;
    align-content: center;
	font-family: 'segoe ui';
	margin: -20px 0 50px;
    position: relative;
    margin: auto;

}
p{
    color: #7993a4;
    font-size: 23px;
}
textarea{
    width: 100%;
    height: 150px;
    resize: none;
    color: #7993a4;
    font-size: 20px;
}
input[type=text]{
    color: #7993a4;
    font-size: 20px;
    width: 100%;
}
button{
    margin-left: 35%;
    display: inline-block;
    width: 30%;
    height: 60px;
    padding: 15px 25px;
    font-size: 23px;
    cursor: pointer;
    color: #fff;
    background-color: #9bb4c5;
    border: none;
    border-radius: 15px;
    box-shadow: 0 9px #999;
}
button:hover{
    background-color: #7993a4;
}
button:active{
    background-color: #7993a4;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
}
</style>