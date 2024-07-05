import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 定义数据状态
const state = {
    taskList:[],
}
// 定义修改数据的方法
const mutations = {
    // 添加任务的方法
    ADD_TASK(state,event){
        // 获取任务标题
        const title = event.target.value.trim();
        // 判断标题不能为空
        if(title.length === 0){
            alert("标题不能为空!!!");
            return;
        }
        // 判断标题不能重复
        if(state.taskList.some(item =>{
            item.title === title;
        })){
            alert("任务已存在!!!,请重新输入");
            return;
        }
        // 把任务保存到store中,也可以使用push方法
        state.taskList = [
            {
                id:Date.now(),
                title,
                isChecked:true
            },
            ...state.taskList
        ]
        // 把输入框清空
        event.target.value = null;
    },

    // 删除任务
    DEL_TASK(state,id){
        if(window.confirm("确定删除该任务吗")){
            state.taskList = state.taskList.filter(item => {
                return item.id !== id;
            })
        }
    },
    // 批量删除
    DEL_BAT_TASK(state){
        state.taskList = state.taskList.filter(item =>{
            return !item.isChecked
        })
    },
    // 选中方法
    UPDATE_TASK_CHECKED(state,id){
        state.taskList = state.taskList.map(item =>{
            if(item.id === id) item.isChecked = !item.isChecked;
            return item;
        })
    },
    // 全选方法 参数 isChecked boolean 类型
    UPDATE_CHECKED_ALL(state,isChecked){
        state.taskList = state.taskList.map(item =>{
            // 把任务中的所有isChecked状态改为 isChecked的状态 取反
            item.isChecked = !isChecked;
            return item;
        })
    }
}
// 定义数据状态的计算属性
const getters = {
    // 统计数据状态选中的数量
    countCheckedNum(){
        return state.taskList.reduce((prev,item)=>{
            if(item.isChecked) prev ++;
            return prev;
        },0)
    },
    // 统计所有数据状态数量
    countSunNum(){
        return state.taskList.length;
    },
    // 判断是否全选
    isCheckedAll(state, { countCheckedNum, countSunNum }){
        // 如果都是0，返回false
        if (countCheckedNum === 0 || countSunNum === 0) return false;
        // 如果选中状态和总数相等
        if (countCheckedNum === countSunNum){
            return true;
        }else{
            return false;
        }
         
    }

}

// 定义store对象
const store = new Vuex.Store({
    state,
    mutations,
    getters,
})

export default store;