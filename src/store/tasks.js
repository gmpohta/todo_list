
function checkStatus(task){
  if (new Date(task.deadline)<new Date()&task.status!=='complited'){
    task.status='outdated'
  }
  if (new Date(task.deadline)>=new Date()&task.status!=='complited'){
    task.status='active'
  }
}

export default {
  state: {
    loadingStatus:false,
    tasks:JSON.parse(localStorage.getItem('tasks')||'[]').map(
      el => {
        checkStatus(el)
        return el
      }
    ),
    taskForEdit:null,
  },
  getters: {
    loadingStatus(state){
      return state.loadingStatus
    },
    tasks(state){
      return state.tasks
    },
    taskForEdit(state){
      return state.taskForEdit
    },
    tasksByDeadline(state){
      return function(deadline){
        return state.tasks.filter(el => {
          return new Date(el.deadline).getFullYear()===new Date(deadline).getFullYear() &&
                  new Date(el.deadline).getMonth()===new Date(deadline).getMonth() &&
                  new Date(el.deadline).getDate()===new Date(deadline).getDate()
        })
      }
    },
  },
  mutations: {
    loadingStatus(state,newLoadingStatus){
      state.loadingStatus=newLoadingStatus
    },
    TaskForEdit(state,taskId){
      const taskIndex=state.tasks.findIndex(el => el.id===taskId)
      state.taskForEdit=null
      if (taskIndex>=0){
        state.taskForEdit=state.tasks[taskIndex]
      }
    },
    createTask(state,task){
      state.tasks.unshift(task)
      localStorage.setItem('tasks',JSON.stringify(state.tasks))
    },
    removeTaskById(state,removedId){
      const removeIndex = state.tasks.findIndex(el => el.id===removedId)
      if(removeIndex>=0){
        state.tasks.splice(removeIndex, 1)
        localStorage.setItem('tasks',JSON.stringify(state.tasks))
      }      
    },
    updateTask(state,updateTask){
      let updateIndex = state.tasks.findIndex(el => el.id==updateTask.id)
      if (updateIndex>=0){
        state.tasks[updateIndex]=updateTask
        localStorage.setItem('tasks',JSON.stringify(state.tasks))
      }
    },
  },
  actions: {
    updateTask({commit},updateTask){
      checkStatus(updateTask)
      commit('updateTask',updateTask)
    },
    createTask({commit},newTask){
      checkStatus(newTask)
      commit('createTask',newTask)
    },
    removeTaskById({commit},removedId){
      commit('removeTaskById',removedId)
    },
    getTasks({commit}){
      commit('loadingStatus',true)
      ////here must be the axios request!
      setTimeout( () =>{
        commit('loadingStatus',false)
      }, 300)
      /////
    },
    getTaskById({commit}, taskId){
      commit('loadingStatus',true)
      ////here must be the axios request!
      setTimeout( () =>{
          commit('TaskForEdit',taskId)
          commit('loadingStatus',false)
      },300)
      /////
    },
  },
}
