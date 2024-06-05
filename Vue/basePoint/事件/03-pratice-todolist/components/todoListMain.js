const todoListMain = {
    props:{
        taskList:{
            type:Array,
            require:true
        }
    },
    methods:{

        upIsCheckedById(id){
            // 设置事件 update:task-list 把选中的id元素 做改变
            this.$emit('update:task-list',this.taskList.map(item =>{
                if(item.id === id){
                    item.isChecked = !item.isChecked
                }
                return item;
            }))
        },
        delTodoById(id){
            if(window.confirm("确认删除")){
                this.$emit("update:task-list",this.taskList.filter(v => v.id !== id))
            }
        }
    },
    template:(`
        <ul class="todo-main">
            <li v-for="task in taskList" :key="task.id">
                <label>
                    <input @change="upIsCheckedById(task.id)" :checked="task.isChecked" type="checkbox"/>
                    <span>{{task.title}}</span>
                </label>
                <button @click="delTodoById(task.id)" class="btn btn-danger">删除</button>
            </li>
        </ul>
    `)
}
export {
    todoListMain
};