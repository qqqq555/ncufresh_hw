<template>
    <div class="center">
        <div v-for="article in articles" :key="article.id">
            <br>
            <div class="article">
            <b class="littleTitle">{{ article.title }}</b>
            <p>{{ article.words }}</p>
            <p>by {{  article.account }}</p>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data () {
        return {
            articles: [],        
        }
    },
    created(){
        axios.get('http://localhost:3000/articles')
            .then(response => {
                this.articles = response.data;
            })
            .catch((err) => {
                console.log(err);
            });
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
    border: solid .3px #8592a2;
    width: 1000px;
}
</style>