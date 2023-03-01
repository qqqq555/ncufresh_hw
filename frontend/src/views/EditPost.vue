<template>
    <div class="center">
    <br>
    <b class="title">編輯文章</b>
    <div class="line"></div>
    <form>
        <br>
        <p>標題：</p>
        <br>
        <input v-model="articles.title" type="text" id="title" name="title" required>
        <br><br>
        <p>內容：</p>
        <br>
        <textarea v-model="articles.words" id="words" name="words" required></textarea>
        <br>
        <button type="submit" @click="save()" class="submit">儲存</button>
    </form>
    </div>
</template>
<script>
import axios from "axios";
import Cookies from "js-cookie";
import { useRoute } from "vue-router";
export default{
    data(){
        return{
            articles: {
                title: '',
                words: '',
            },
            id: this.$route.params.id
        }
    },
    created(){
        let id = this.$route.params.id;
        const route = useRoute();
        axios.get('/api/articles/edit/'+ id)
            .then(response => {
                this.articles.title = response.data[0].title;
                this.articles.words = response.data[0].words;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    methods: {
        save() {
            axios.put('/api/articles/edit/' + this.$route.params.id, this.articles).then(() => {
                alert("編輯成功!");
                window.location.href = "/";
            });
        }
    }
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