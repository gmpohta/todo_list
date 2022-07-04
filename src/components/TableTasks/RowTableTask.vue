<template>
  <tr :class="{complited: task.status==='complited', outdated: task.status==='outdated'}" :key="task">
    <td>
      <div style="margin: 7px 0 0 0;">
        <label class="center">
          <input type="checkbox" @change="changeStatus()" :key="task" v-model="status" :disabled="disabled"/><span style=""></span>  
        </label>
      </div> 
    </td>
    <td>{{ index+1 }}</td>
    <td style="align-items: center;">
      <router-link :to="'/task/'+task.id" style="font-weight:bold;">
        {{ task.title.toUpperCase() }}
      </router-link>
    </td>
    <td><div class="text-for-description">{{ task.description }}</div></td>
    <td>{{ (new Date(task.deadline)).toLocaleDateString() }}</td>
    <td>{{ (new Date(task.createDate)).toLocaleDateString() }}</td>
    <td>{{ task.status }}</td>
    <td>
    <button class="btn-floating btn-small rm" @click="removeTask(task.id)">&#x2716</button></td>
  </tr>
</template>

<script>
export default {
  computed:{
    disabled(){
      if(this.task.status==='outdated'){
        return true
      }
    },
    status:{
      get(){let tmp = false
        if(this.task.status==='complited'){
          tmp=true
        }
        return tmp
      },
      set(status){}
    }
  },
  props: {
    task:{
      type:Object,
      required: true 
    },
    index:Number
  },
  methods:{
    removeTask(id){
      this.$store.dispatch('removeTaskById',id)
    },
    changeStatus(){
      const newTask={...this.task}
      if(this.task.status==='complited'){
        newTask.status='active'
      }
      if(this.task.status==='active'){
        newTask.status='complited'
      }
      this.$store.dispatch('updateTask',newTask)
    }
  }
}
</script>

<style scoped lang="scss">
td{
  border-radius:0;
  word-break:break-all;
}
.text-for-description{
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow:hidden;
}
.complited{
  background: rgba(180,180,180,0.4);
  color:rgba(60,60,60,0.6);
  font-weight:bold;
}
.outdated{
  background: rgba(180,80,80,0.4);
  color:rgba(60,30,30,0.6);
  font-weight:bold;
}
.rm{
  background: rgba(200,80,80,0.6);
  color:#fff;
  font-weight:bold;
  font-size:15px;
}
</style>
