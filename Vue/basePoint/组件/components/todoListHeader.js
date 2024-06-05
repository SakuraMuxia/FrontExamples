export default {
    props:{
        addTaskList:{
            type:Function,
            require:true
        }
    },
    template:(`
        <div class="todo-header">
            <input @keyup.enter="addTaskList" type="text" placeholder="请输入你的任务名称，按回车键确认"/>
        </div>
    `)
}