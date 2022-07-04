<template>
<div>
    <div v-if="loadingStatus" style="text-align:center; display:block; margin-top:5%">
        <Loader />
    </div>
    <div v-else-if="!task" style="text-align:center; display:block;">
        <h3>Нет такой задачи</h3>
        <button class="btn"  type="button" @click="goBack" style="margin-top:5%">
            Назад
        </button>
    </div>
    <div v-show="!loadingStatus && task">
        <form  @submit.prevent="updateTask" id="form-update">
            <div >
                <label for="deadline" type="text">Дата завершения</label>
                <div class="row" style="padding:0; margin:0">
                    <div class="input-field col s4" style="padding:0; margin:0">
                        <input id="deadline" type="text" ref="datepicker" :disabled="status==='complited'"/>
                    </div>
                </div>
            </div>   
            <div>
                <label type="text" >Описание задачи</label>
                <textarea 
                    ref="description" 
                    style="min-height:150px"
                    class="materialize-textarea" 
                    v-model="this.description" 
                    :disabled="status==='complited'"
                />
                <span class="character-counter" style="float: right; font-size: 12px;">
                    {{this.description.length}}/{{descriptionLenLim}}
                </span>
            </div>
        </form>
        <div style="margin-top:2%;">
            <button class="btn red"  type="submit" @click="updateTask" :disabled="status==='complited'">
                Изменить
            </button>
            <button class="btn"  type="button" @click="goBack" style="margin-left:5%">
                Назад
            </button>
        </div> 
    </div>
</div>
</template>
<script>
import {descriptionLenLim} from '@/scripts/const.js'
import Loader from '@/components/Loader.vue'

export default {
    components:{
        Loader,
    },
    computed:{
        task(){
            let task=this.$store.getters.taskForEdit
            if (task){
                this.description=task.description      
                this.$emit('send-title',task.title)
                if (this.date){
                    this.date.setDate(task.deadline)
                    this.date._finishSelectionBound() 
                }
                this.status=task.status
            }
            return task
        },
        loadingStatus(){
            return this.$store.getters.loadingStatus
        },
    },
    data(){
        return{
            descriptionLenLim,
            date:null,
            prevRoute:'/',
            description:'',
            status:'',
        }
    },
    watch:{
        description(){
            if (this.description.length>this.descriptionLenLim){
                this.description=this.description.slice(0,this.description.length-1)
            }
        },
    },
    methods:{
        goBack(){
            this.$router.push(this.prevRoute)
        },
        updateTask(){
            this.$store.dispatch('updateTask',
                {
                    ...this.task,
                    deadline:this.date.date,
                    description:this.description,
                })
            this.goBack()
        },
    },
    mounted(){
        if (this.$router.options.history.state.back){
            this.prevRoute=this.$router.options.history.state.back
        }
        window.scrollTo(0,0)
        this.$emit('send-title','')
        this.$store.dispatch('getTaskById',+this.$route.params.id)   

        this.date=M.Datepicker.init(this.$refs.datepicker,{
            format: 'dd.mm.yyyy',
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