<template>
  <div class="collection">
    <router-link
      to="/"
      exact
      active-class="active"
      class="collection-item"
    >Все задачи</router-link>
    <router-link
      to="/group-to-deadline"
      exact
      active-class="active"
      class="collection-item"
    >По дате завершения</router-link>
  </div>
</template>
<style scoped lang="scss">
  
</style>