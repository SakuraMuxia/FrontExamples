<template>
    <div class="todo-container">
        <div class="todo-wrap">
            <TodoHeader></TodoHeader>
            <TodoMain></TodoMain>
            <TodoFooter></TodoFooter>
        </div>
    </div>
</template>

<script>
import TodoHeader from '@/components/TodoHeader.vue';
import TodoMain from '@/components/TodoMain.vue';
import TodoFooter from '@/components/TodoFooter.vue';

export default {
    name: 'App',
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
