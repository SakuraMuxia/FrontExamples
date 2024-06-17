<template>
    <div data-reactroot="" class="container">
        <section class="jumbotron">
            <h3 class="jumbotron-heading">Search Github Users</h3>
            <div>
                <input ref="keywordRef" type="text" placeholder="请输入搜索的用户名">
                <button @click="SearchUser">Search</button>
            </div>
        </section>
        <h3 v-if="!isStart">您可以在上方输入搜索关键词，点击搜索按钮进行搜索！</h3>
        <h3 v-else-if="isLoading">正在拼命加载中……</h3>
        <h3 v-else-if="isError">您搜索的过于频繁，请稍后再试！</h3>
        <h3 v-else-if="items.length === 0">您搜索出来的结果为空！</h3>
        <div v-else class="row">
            <div v-for="item in items" :key="item.id" class="card">
                <a :href="item.html_url" target="_blank">
                    <img :src="item.avatar_url" style="width: 100px;"></a>
                <p class="card-text">{{ item.login }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    data(){
        return{
            items:[],
            isStart:false,
            isLoading:false,
            isError:false,
        }
    },
    methods:{
        // 搜索用户
        SearchUser(){
            this.isStart = true;
            this.isLoading = true;
            const q = this.$refs.keywordRef.value.trim();
            console.log(q);
            if(q.length ===0 ){
                alert('您输入的用户名为空');
                return;

            }
            this.$axios.get("/search/users",{
                params:{
                    sort:"stars",
                    q,
                },
            }).then(res => {
                this.items = res;
            }).catch(err =>{
                this.isError = true;
                console.log(err);
            }).finally(() => {
                this.isLoading = false;
            })
        }
    },
}
</script>

<style lang="less">
.album {
    min-height: 50rem;
    /* Can be removed; just added for demo purposes */
    padding-top: 3rem;
    padding-bottom: 3rem;
    background-color: #f7f7f7;
}

.card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
}

.card>img {
    margin-bottom: .75rem;
    border-radius: 100px;
}

.card-text {
    font-size: 85%;
}
</style>
