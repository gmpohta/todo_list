<template>
  <div>
    <div>
      <Select
        @select-task="filterTasks"
      />
    </div>
    <div>
      <div v-if="loadingStatus" style="text-align:center; display:block; margin-top:5%">
        <Loader />
      </div>
      <TableTasks 
        v-else-if="computedFilter.length"
        :tasks="computedFilter"
      />
      <p v-else style="text-align:center; padding-top:5%; font-size:20px; color:#aaa;">Нет задач</p>
      
    </div>
  </div>
</template>

<script>
import TableTasks from '@/components/TableTasks/TableTasks.vue'
import CreateTask from '@/components/CreateTask.vue'
import Loader from '@/components/Loader.vue'
import Select from '@/components/Select.vue'

export default {
  name: 'HomeView',
  components: {
    TableTasks,
    CreateTask,
    Select,
    Loader,
  },
  mounted(){
    this.$emit('send-title',this.$route.meta.title)
    this.$store.dispatch('getTasks')
  },
  methods: {
    filterTasks(filter){
      this.filter=filter
    }
  },
  computed:{
    computedFilter(){
      return this.tasks.filter(t =>{
        if (!this.filter){
          return true
        }
        return t.status === this.filter
    })},
    tasks(){
      return this.$store.getters.tasks
    },
    loadingStatus(){
      return this.$store.getters.loadingStatus
    },
  },
  data(){
    return{
      filter:'',
    }
  },
}
</script>
<style scoped lang="scss">
.scroll{
  overflow-y:auto;
}
.body{
   background: #655;
   height: 100ch; 
   margin: 0;
   padding: 2%;
  }
.container-fluid{
  height:100ch;
}
</style>