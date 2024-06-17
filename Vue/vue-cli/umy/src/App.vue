<template>
    <div class="todo-container">
        <div class="todo-wrap">
            <TodoHeader :taskList.sync="taskList"></TodoHeader>
            <TodoMain :taskList.sync = "taskList"></TodoMain>
            <TodoFooter :taskList.sync = "taskList"></TodoFooter>
        </div>
    </div>
</template>

<script>
import TodoHeader from '@/components/TodoHeader.vue';
import TodoMain from '@/components/TodoMain.vue';
import TodoFooter from '@/components/TodoFooter.vue';
import "@/assets/css/index.css"

export default {
    name: 'App',
    data(){
        return{
            // 使用 localStronge对象 若taskList键存在，将json格式的字符串转为数组，否则为空数组
            taskList:localStorage.getItem("taskList")?JSON.parse(localStorage.getItem("taskList")):[]
        }
    },
    updated(){
        // 设置taskList的键名，值为json格式字符串，(将数组转为json格式字符串)
        localStorage.setItem("taskList",JSON.stringify(this.taskList))
    },
    components:{TodoFooter,TodoMain,TodoHeader}
}
</script>

<style lang="less">
    /*app*/
    .todo-container {
        width: 600px;
        margin: 0 auto;
    }

    .todo-container .todo-wrap {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
</style>
