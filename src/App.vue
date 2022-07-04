<template>
  <div class="" style="margin: 2% 3% 0% 2%;">
    <div ref="create">
      <div class="card-create">
        <CreateTask/>
      </div>
      <div>
        <h2 style="text-align:center; margin: 2% 0% 2% 0%;">{{ title }}</h2>
      </div>
      <hr>
    </div>

    <div  class="nav" :style="{top:this.top+'px'}">
      <Navbar />
    </div>

    <div style="padding-left:150px; height:100rem">
      <router-view @send-title="getTitle"/>
    </div>
  </div>
  
</template>

<script>
import Navbar from "@/components/Navbar"
import CreateTask from "@/components/CreateTask"

export default{
  components:{
    Navbar,
    CreateTask,
  },
  data(){
    return{
      title:'',
      top:0,
      ro:null,
    }
  },
  methods:{
    getTitle(title){
      this.title=title
    },
    setNavPosition(){
      let bottom=this.$refs.create.getBoundingClientRect().bottom
      if (bottom>=0){
        this.top=bottom
      }else{
        this.top=15
      }
    }
  },

  mounted(){
    const ro = new ResizeObserver(() => {
      this.setNavPosition()
    })
    ro.observe(this.$refs.create)

    window.addEventListener('scroll', this.setNavPosition);
  },
}
</script>

<style>
@import "~materialize-css/dist/css/materialize.min.css";
</style>
<style scoped lang="scss">
  .nav{
    width:130px; 
    padding:0; 
    margin:0; 
    position:fixed;
  }
  .card-create{
    padding: 0.5%;
    border: 1px solid rgb(0,0,0,0.15);
    border-radius:5px;
  }
  .card-view{

  }
 
</style>

