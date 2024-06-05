import PageList from "./PageList.js";
// 评论展示模版
const template = (`
    <div class="commentOn">
        <div class="noContent" v-show="contentList.length===0">暂无留言</div>
        <div class="messList">
            <div v-for="item in contentList" :key="item._id" class="reply">
                <p class="replyContent">{{item.content}}</p>
                <p class="operation">
                    <span class="replyTime">{{item.addTime|date}}</span>
                    <span class="handle">
                        <a @click="putWeibo(item._id,1)" href="javascript:;" class="top">{{item.topNum}}</a>
                        <a @click="putWeibo(item._id,2)" href="javascript:;" class="down_icon">{{item.downNum}}</a>
                        <a @click="deleteWeibo(item._id)" href="javascript:;" class="cut">删除</a>
                    </span>
                </p>
            </div>
        </div>
        <page-list :page-sum="pageSum" :page-no="pageNo" ></page-list>
    </div>
`)
// 定义请求函数
const methods = {
    // 获取评论请求
    async getWeibo(pageNo=1){
        // 获取相应数据
        const {contentList,pageNo:pageIndex,pageSum} = await this.$axios.get(`/weibo/${pageNo}?pageSize=3`);
        this.contentList = contentList;
        this.pageNo = pageIndex;
        this.pageSum = pageSum;
    },
    // 发送顶或踩请求
    async putWeibo(id,type){
        await this.$axios.put(`/weibo/${id}/${type}`);
        // 获取当前分页 评论
        this.getWeibo(this.pageNo);
    },
    // 删除评论
    async deleteWeibo(id){
        await this.$axios.delete(`/weibo/${id}`);
        this.getWeibo(this.pageNo);
    }
}
export default {
    template,
    // 组件的嵌套
    components:{
        PageList
    },
    data(){
        return {
            contentList:[],
            pageNo:1,
            pageSum:1
        }
    },
    methods,
    // 挂载完成后 
    mounted(){
        // 执行获取评论
        this.getWeibo();
        // 执行监听 获取评论 事件
        this.$bus.$on("getWeibo",this.getWeibo);
    },
    filters:{
        date(t){
            const timer = new Date(t);
            return timer.getFullYear() + "-" +
            (timer.getMonth() + 1).toString().padStart(2, 0) + "-" +
            timer.getDate().toString().padStart(2, 0) + " " +
            timer.getHours().toString().padStart(2, 0) + ":" +
			timer.getMinutes().toString().padStart(2, 0) + ":" +
			timer.getSeconds().toString().padStart(2, 0);
        }
    }

}