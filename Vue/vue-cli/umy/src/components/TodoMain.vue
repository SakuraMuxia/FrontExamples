<template lang="">
    <div>
        <ul class="todo-main">
            <li @mouseenter="activeId=item.id" @mouseleave="activeId=-1" v-for = "item in taskList" :key="item.id">
                <label>
                    <input @change = "upTaskListById(item.id)" :checked = "item.isChecked" type="checkbox" />
                    <span>{{item.title}}</span>
                </label>
                <button @click="delTaskListById(item.id)" v-show="item.id ===activeId " class="btn btn-danger">删除</button>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'TodoMain.vue',
    props:["taskList"],
    data(){
        return {
            activeId:-1,
        }
    },
    methods:{
        upTaskListById(id){
            // 增加自定义事件 taskList，并把这个元素 更改后 抛给 父组件中的数据 去除勾选状态
            this.$emit('update:taskList',this.taskList.map(item => {
                // 把每个元素的isChecked属性取反
                if(item.id === id){
                    item.isChecked = !item.isChecked;
                }
                return item;
            }))
        },
        // 删除任务
        delTaskListById(id){
            if(window.confirm("确定要删除该任务吗")){
                // 设置自定义事件,把删除后的任务留下来
                this.$emit("update:taskList",this.taskList.filter(item => item.id != id));
            }
        }

    },
}
</script>
<style lang="less">
    /*main*/
    .todo-main {
        margin-left: 0px;
        border: 1px solid #ddd;
        border-radius: 2px;
        padding: 0px;
    }
    .todo-empty {
        height: 40px;
        line-height: 40px;
        border: 1px solid #ddd;
        border-radius: 2px;
        padding-left: 5px;
        margin-top: 10px;
    }
    /*item*/
    li {
        list-style: none;
        height: 36px;
        line-height: 36px;
        padding: 0 5px;
        border-bottom: 1px solid #ddd;
    }

    li label {
        float: left;
        cursor: pointer;
    }

    li label li input {
        vertical-align: middle;
        margin-right: 6px;
        position: relative;
        top: -1px;
    }

    li button {
        float: right;
        display: none;
        margin-top: 3px;
    }

    li:before {
        content: initial;
    }

    li:last-child {
        border-bottom: none;
    }
</style>