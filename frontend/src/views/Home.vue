<template>
    <div class="center">
        <div v-for="article in articles" :key="article.id">
            <br>
            <div class="article">
            <b class="littleTitle">{{ article.title }}</b>
            <p>{{ article.words }}</p>
            <p class="author">by {{  article.account }}</p>
            <input type="image" class="arrow" img src="down.png" @click="comment(article.id)" v-if="postId!=article.id">
            <input type="image" class="arrow" img src="up.png" @click="close()" v-if="postId==article.id">
            </div>
            <div class="comment" v-if="postId==article.id">
            <div class="line"></div>
            <ul>
                <li v-for="comment in comments" :key="comment.id">
                    <p>{{ comment.account }}: {{ comment.words }}</p>
                </li>
            </ul>
            <form>
                <input class="words" id="words" name="words" type="text" placeholder="新增留言" required>
                <button type="submit" class="add" @click="post(article.id)">送出</button>
            </form>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Cookies from 'js-cookie';
export default {
    data () {
        return {
            articles: [],        
            comments: [],
            postId: 0,
        }
    },
    created(){
        axios.get('/api/articles')
            .then(response => {
                this.articles = response.data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    methods: {
        comment(id){
            axios.get('/api/comments/'+id)
                .then(response => {
                    this.comments = response.data;
                    this.postId = id;
                })
                .catch((err) => {
                console.log(err);
                });
        },
        close(){
            this.postId = 0;
        },
        post(id){
            if (!Cookies.get("jwt")) {
                alert("登入後才可留言!");
            }
            else{
                axios.post('/api/comments/'+id+'/'+Cookies.get("account"), {words: words.value})
                .catch((err) => {
                console.log(err);
                });

            }
        }
    }
};
</script>
<style scoped>

*{
  margin: 0;
  padding: 0px;
  border: 0px;
  box-sizing: border-box;
}
.littleTitle{
    font-size: 28px;
    color: #8592a2;
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
.article{
    
    width: 100%;
}
.arrow{
    width: 23px;
    float: right;
    margin-right: 3%;
    margin-bottom: 3px;
    display: inline;
}
li{
    list-style: none;
}
input[type=text]{
    color: #7993a4;
    font-size: 23px;
    width: 90%;
    border: solid .3px #8592a2;
}
.author{
    display: inline;
}
.add{
    display: inline-block;
    width: 10%;
    padding: 3px 5px;
    font-size: 20px;
    cursor: pointer;
    color: #fff;
    background-color: #9bb4c5;
    border: none;
    border-radius: 15px;
    box-shadow: 0 6px #999;
    margin-top: 3px;
}
.add:hover{
    background-color: #7993a4;
}
.add:active{
    background-color: #7993a4;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
}
.line{
    width: 100%;
    height: 1px;
    border-top: solid #8E9BAE;
    border-style: dashed;
    margin-bottom: 5px;
    margin-top: 5px;
}
@media(max-width: 600px) {
    input[type=text]{
        width: 80%;
    }
    .add{
        width: 20%;
    }
}
</style>