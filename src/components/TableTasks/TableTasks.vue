<template>
  <table class="table">
    <thead style="border: 1px solid rgb(0,0,0,0.15);">
      <tr>
        <th scope="col" class="checkbox"></th>
        <th scope="col" class="num">#</th>
        <th scope="col" class="title">Задача</th>
        <th scope="col" class="description">Описание</th>
        <th scope="col" class="dead">Дата завершения</th>
        <th scope="col" class="create">Дата создания</th>
        <th scope="col" class="status">Статус</th>
        <th scope="col" class="del"></th>
      </tr>
    </thead>
    <tbody>
      <RowTableTask 
        v-for="(el,i) in tasks" 
        :task="el"
        :index="i"
        @remove-task="removeTask"
      />
    </tbody>
  </table>
</template>

<script>
import RowTableTask from '@/components/TableTasks/RowTableTask.vue'
export default {
  props: ['tasks'],
  components:{
    RowTableTask,
  },
  methods:{
    removeTask(id){
      this.$emit('remove-task',id)
    }
  }
}
</script>

<style scoped lang="scss">
  table {
    width: 100%;
    table-layout: fixed;
  }
  .checkbox {
    width: 5%;
  }
  .num {
    width: 10%;
  }
  .title {
    width: 12%;
  }
  .description {
    width: 18%;
  }
  .dead {
    width: 14%;
  }
  .create {
    width: 14%;
  }
  .del {
    width: 5%;
  }
  .status {
    width: 13%;
  }
</style>
