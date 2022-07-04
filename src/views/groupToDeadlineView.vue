<template>
  <div>
    <div v-if="loadingStatus" style="text-align:center; display:block; margin-top:5%">
        <Loader />
    </div>
    <div v-else>
      <div>
        <div v-for="el in tasksList">
          <h2 style="font-weight:700; font-size:25px; text-align:center;">
            {{ (new Date(el.deadline)).toLocaleDateString() }}
          </h2>

          <div>
            <TableTasks 
              v-if="el.tasks.length"
              :tasks="el.tasks"
            />
            <p v-else style="text-align:center; font-size:20px; color:#aaa;">Нет задач</p>
          </div>
        </div>
      </div>
      <div style="display:block; text-align:center; padding:5% 0 10% 0;">
        <button class="btn btn-outline-primary" type="submit" @click="addDaysForShow">Показать еще</button>
      </div>
    </div>    
  </div>
</template>

<script>
import Loader from '@/components/Loader.vue'
import TableTasks from '@/components/TableTasks/TableTasks.vue'
export default{
  components:{
    TableTasks,
    Loader,
  },
  data(){
    return{
      numDaysForShow:10,
    }
  },
  methods:{
    getTasksByDays(nDays) {
      var arr = new Array()
      var dt = new Date()
      for (let count=0; count < nDays; count+=1) {
          arr.push({deadline:dt.toString(),tasks:this.$store.getters.tasksByDeadline(dt)})
          dt.setDate(dt.getDate() + 1)
      }
      return arr;
    },
    addDaysForShow(){
      this.numDaysForShow+=10
    }
  },
  computed:{
    tasksList:{
      get(){
        return this.tasksList=this.getTasksByDays(this.numDaysForShow)
      },
      set(){}
    },
    loadingStatus(){
      return this.$store.getters.loadingStatus
    },
  },
  
  mounted(){
    this.$emit('send-title',this.$route.meta.title)
    this.$store.dispatch('getTasks')
  },
}
</script>
<style scoped lang="scss">

</style>