<template lang="">
    <div>
        <div class="todo-footer">
            <label>
                <input @change="changeAllChecked" :checked="isAllChecked" type="checkbox" />
            </label>
            <span>
                <span>已选中{{CheckedNum}}/全部{{allNum}}</span>
            </span>
            <button class="btn btn-danger" @click="delTaskListByIsChecked" v-show="CheckedNum>0">清除已完成任务</button>
        </div>
    </div>
</template>
<script>
export default {
    name:'TodoFooter.vue',
    props:["taskList"],
    data(){
        return{
            isAllChecked:true,
            CheckedNum:0,
            allNum:0
        }
    },
    methods:{
        // 删除 选中的任务列表 留下未选中的数据
        delTaskListByIsChecked(){
            this.$emit("update:taskList",this.taskList.filter(item => !item.isChecked))
        },

        // 全选方法
        changeAllChecked(){
            this.$emit("update:taskList",this.taskList.map(item => {
                item.isChecked = !this.isAllChecked;
                return item;
            }))
            this.isAllChecked = !this.isAllChecked;
        },
        

    },
    // 使用侦听器 监听数组发生变化
    watch:{
        taskList:{
            // 句柄
            handler(){
                // 数组长度 总数
                this.allNum = this.taskList.length;
                // 累计运算,计算有几个被选中
                this.CheckedNum = this.taskList.reduce(function(prev,item){
                    if(item.isChecked){
                        prev++;
                    }
                    return prev;
                },0);
                // 设置全选按钮的初始状态,当总数为0时，全选灯不亮
                if(this.allNum === 0){
                    this.isAllChecked = false;
                }else{
                    // 当总数不为0，选中===总数时，全选灯亮
                    this.isAllChecked = this.CheckedNum === this.allNum
                }
            },
            // 立即执行
            immediate:true
        }
    },
    
    
}
</script>
<style lang="less">
    /*footer*/
    .todo-footer {
        height: 40px;
        line-height: 40px;
        padding-left: 6px;
        margin-top: 5px;
    }

    .todo-footer label {
        display: inline-block;
        margin-right: 20px;
        cursor: pointer;
    }

    .todo-footer label input {
        position: relative;
        top: -1px;
        vertical-align: middle;
        margin-right: 5px;
    }

    .todo-footer button {
        float: right;
        margin-top: 5px;
    }
</style>