<template lang="">
    <div>
        <div class="todo-header">
            <input @keyup.enter="addTaskList" type="text" placeholder="请输入你的任务名称，按回车键确认" />
        </div>
    </div>
</template>
<script>
export default {
    name:'TodoHeader.vue',
    props:{
        taskList:{
            type:Array,
            required:true,
        }
    },
    methods:{
        addTaskList(e){
            const title = e.target.value.trim();
            // 如果输入框为空
            if(!title){
                alert("请输入任务标题");
                return;
            }
            // 判断数组中是否存在相同标题
            if(this.taskList.some(item => item.title === title)){
                alert("任务标题不允许重复!");
                return;
            }
            // 自定义事件
            this.$emit('update:taskList',[
                {
                    id:Date.now(),
                    title,
                    isChecked:true,
                },
                // 把之前的添加上
                ...this.taskList,
            ]);
            // 清空输入框上的内容
            e.target.value = null;
        }
    }
}
</script>
<style lang="less">
    /*header*/
    .todo-header input {
        width: 560px;
        height: 28px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 4px 7px;
    }

    .todo-header input:focus {
        outline: none;
        border-color: rgba(82, 168, 236, 0.8);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
    }

</style>