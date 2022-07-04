<template>
    <form  @submit.prevent="createTask">
        <div class="row"> 
            <div class="col s8">
                <label type="text" for="title" >Задача</label>
                <input type="text" id="title"  v-model="title" class="validate" required>
            </div>
            <div class="col s4">
                <label for="dead-date" type="text">Дата завершения</label>
                <input id="dead-date" style="text-align:right" type="text" ref="datepicker"/>
            </div>   
            <div class="col s12">
                <label type="text" >Описание задачи</label>
                <textarea 
                    ref="description" 
                    class="materialize-textarea" 
                    v-model="description" 
                />  
                <span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/{{descriptionLenLim}}</span>
                
            </div>
            <div class="col s12">
               <button class="btn btn-outline-primary" type="submit" @click="createTask">Создать</button>
            </div> 
        </div>  
    </form>
</template>
<script>
import {descriptionLenLim} from '@/scripts/const.js'

export default {
    data(){
        return{
            title:'',
            date:null,
            description:'',
            descriptionLenLim,
        }
    },
    watch:{
        description(){
            if (this.description.length>this.descriptionLenLim){
                this.description=this.description.slice(0,this.description.length-1)
            }
        }
    },
    methods:{
        createTask(){
            if (this.title.trim()){
                const newTask={
                    title:this.title,
                    id:Date.now(),
                    status: 'active',
                    deadline:this.date.date,
                    createDate: new Date(),
                    description:this.description,
                }
                this.$store.dispatch('createTask',newTask)
                this.title=''
                this.description=''
                this.$refs.description.style.height='1px'
            }
        },
    },
    mounted(){
        this.date=M.Datepicker.init(this.$refs.datepicker,{
            format: 'dd.mm.yyyy',
            defaultDate: new Date(),
            setDefaultDate: true,
            autoClose:true,
        })
    },
    destroy(){
        if(this.date && this.date.destroy){
            this.date.destroy()
        }
    }
}
</script>
<style>

</style>