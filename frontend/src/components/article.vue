<template> 
    <div>
        <div v-for="article in articles" :key="article.id">
            <h2>{{ article.title }}</h2>
            <p>{{ article.content }}</p>
        </div>
        
    </div>
</template>
<script>
    export default {
        data () {
            return {
                article: [],        
            }
        },
    };
</script>
