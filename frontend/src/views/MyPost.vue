<template>
    <div class="center">
    <br>
    <b class="title">新增文章</b>
    <div class="line"></div>
    <form>
        <br>
        <p>標題：</p>
        <br>
        <input v-model="title" type="text" id="title" name="title" required>
        <br><br>
        <p>內容：</p>
        <br>
        <textarea v-model="words" id="words" name="words" required></textarea>
        <br>
        <button type="submit" @click="post" class="submit">送出</button>
    </form>
    <br>
    <b class="title">編輯文章</b>
    <div class="line"></div>
    <div v-for="article in articles" :key="article.id">
        <br>
        <div class="article">
            <br>
            <b class="littleTitle">{{ article.title }}</b>
            <input type="image" class="trash" img src="trash.png" @click="deletePost(article.id)">
            <input type="image" class="edit" img src="edit.png" @click="editPost(article.id)">
            <p>{{ article.words }}</p>
            <br>
        </div>
    </div>
    </div>
</template>
<script>
import axios from "axios";
import Cookies from "js-cookie";
import { loadRouteLocation, useRoute } from "vue-router";
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
                    '/api/articles/post',
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
        axios.get('/api/articles/'+ Cookies.get("account"))
            .then(response => {
                this.articles = response.data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    methods: {
        async deletePost(id) {
            location.reload();
            let result = await axios.delete('/api/articles/'+id);
            
        },
        editPost(id){
            this.$router.push({path: "/editpost/"+ id});
        }
    },
};
</script>
<style scoped>
@media(max-width: 600px) {
    .submit{
        margin-left: 25%;
        display: inline-block;
        width: 50%;
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
}
@media(min-width: 600px) {
    .submit{
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
}

*{
  margin: 0;
  padding: 0px;
  border: 0px;
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
    width: 100%;
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
    width: 70%;
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
    border: solid .3px #8592a2;
}
input[type=text]{
    color: #7993a4;
    font-size: 20px;
    width: 100%;
    border: solid .3px #8592a2;
}

.submit:hover{
    background-color: #7993a4;
}
.submit:active{
    background-color: #7993a4;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
}
.article{
    border: solid .3px #8592a2;
    
}
.trash, .edit{
    width: 23px;
    float: right;
    margin-right: 3%;
}
.edit:hover, .trash:hover{
    box-shadow: 3px 3px #8592a2;
}

</style>