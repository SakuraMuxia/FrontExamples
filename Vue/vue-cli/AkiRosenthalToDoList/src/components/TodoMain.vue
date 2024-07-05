<template lang="">
    <div>
        <ul class="todo-main">
            <li @mouseenter="flag=item.id" @mouseleave="flag=-1" v-for="item in taskList" :key="item.id" >
                <label>
                    <input @change="UPDATE_TASK_CHECKED(item.id)" :checked="item.isChecked" type="checkbox" />
                    <span>{{item.title}}</span>
                </label>
                <button @click="DEL_TASK(item.id)" v-show="flag===item.id" class="btn btn-danger">删除</button>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
    name:'TodoMain.vue',
    data(){
        return{
            flag:-1
        }
    },
    computed:{
        ...mapState(['taskList'])
    },
    methods:{
        ...mapMutations(['UPDATE_TASK_CHECKED', 'DEL_TASK'])
    }
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