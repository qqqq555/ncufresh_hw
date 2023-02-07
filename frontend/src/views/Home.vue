<template>
    <div>
        <div v-for="article in articles" :key="article.id">
            <h2>{{ article.title }}</h2>
            <p>{{ article.content }}</p>
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