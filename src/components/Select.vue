<template>
<div class="row" style="padding:0; margin:0">
    <div class="input-field col s4" style="padding:0; margin:0">
        <select ref="select" @change="selectTask()">
            <option value="">Все</option>
            <option value="outdated">Просрочено</option>
            <option value="complited">Завершено</option>
            <option value="active">В работе</option>
        </select>
    </div>
</div>

</template>

<script>
export default {
    mounted(){
        M.FormSelect.init(this.$refs.select)
    },
    methods:{
        selectTask(){
            this.$emit('select-task',this.$refs.select.value)
        }
    }
}
</script>
<style scoped lang="scss">

</style>