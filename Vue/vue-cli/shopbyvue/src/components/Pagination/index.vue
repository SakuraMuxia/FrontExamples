<template lang="">
    <div>
        <div class="pagination">
            <button @click="$emit('change-page-no',pageNo-1)" :disabled="pageNo===1" >上一页</button>
            <button @click="$emit('change-page-no',1)" v-show="startAndEnd.start>1">首页</button>
            <span v-show="startAndEnd.start>2">···</span>

            <button 
                v-for="page in (startAndEnd.end - startAndEnd.start+1)" 
                :key="page"
                :class="{active:pageNo===startAndEnd.start+page-1}"
                @click="$emit('change-page-no',startAndEnd.start+page-1)"
                >{{startAndEnd.start+page-1}}
            </button>

            <span v-show="pageSum>startAndEnd.end+1" >···</span>
            <button @click="$emit('change-page-no',pageSum)" v-show="pageSum>startAndEnd.end" >尾页</button>
            <button @click="$emit('change-page-no',pageNo+1)" :disabled="pageNo===pageSum">下一页</button>
            <span>共 {{total}} 条</span>
        </div>
    </div>
</template>
<script>
export default {
    props: ["total", "pageSize", "pageNo", "continue"],
    name:"Pagination",
    data(){
        return{
            
        }
    },
    computed: {
        // 计算总页数
        pageSum() {
            return Math.ceil(this.total / this.pageSize)
        },
        // 计算起始与结束位置
        startAndEnd() {
            // 定义初始的开始位置和结束位置
            let start = 0;
            let end = 0;
            
            // pageNo当前页 = 16,continue页长为5，start==>14 end=18
            // 实际页码长度不足continue
            if (this.continue > this.pageSum){
                start = 1;
                end = this.pageSum;
            }else{
                start = this.pageNo - (this.continue - 1) / 2;
                end = this.pageNo + (this.continue - 1) / 2;
                // 左边界问题
                if (start < 1) {
                    start = 1;
                    end = start + this.continue - 1;
                }
                // 右边界问题
                if (end > this.pageSum) {
                    end = this.pageSum;
                    start = this.pageSum - this.continue + 1;
                }
            }
            // console.log(start,end);
            return { start, end };
        }
    }
}
</script>
<style lang="less" scoped>
    .pagination {
        text-align: center;

        button {
            margin: 0 5px;
            background-color: #f4f4f5;
            color: gray;
            outline: none;
            border-radius: 2px;
            padding: 0 4px;
            vertical-align: top;
            display: inline-block;
            font-size: 13px;
            min-width: 35.5px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            border: 0;

            &[disabled] {
                color: #c0c4cc;
                cursor: not-allowed;
            }

            &.active {
                cursor: not-allowed;
                background-color: #c81623;
                color: #fff;
            }
        }

        span {
            display: inline-block;
            line-height: 28px;
            font-size: 14px;
            color: gray;
            vertical-align: middle;
        }
    }
</style>