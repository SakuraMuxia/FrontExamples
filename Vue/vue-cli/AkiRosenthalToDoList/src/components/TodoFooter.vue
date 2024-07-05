<template lang="">
    <div>
        <div class="todo-footer">
            <label>
                <input @click="UPDATE_CHECKED_ALL(isCheckedAll)" :checked="isCheckedAll" type="checkbox" />
            </label>
            <span>
                <span>已选中{{countCheckedNum}}/全部{{countSunNum}}</span>
            </span>
            <button @click="DEL_BAT_TASK()" v-show="countCheckedNum>0"  class="btn btn-danger">清除已完成任务</button>
        </div>
    </div>
</template>
<script>
import {mapGetters , mapMutations} from 'vuex';
export default {
    name:'TodoFooter.vue',
    methods:{
        ...mapMutations(['UPDATE_CHECKED_ALL','DEL_BAT_TASK'])
    },
    computed:{
        ...mapGetters(['isCheckedAll','countCheckedNum','countSunNum',])
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