<template>
 <div>
   <div @click="isShow = !isShow" class="cursor"><summary><mark>点击查看答案</mark></summary></div>
   <div v-show="isShow">
     <slot></slot>
   </div>
 </div>
</template>

<script>
 export default {
   name: 'vue-details',
   data () {
     return {
       isShow: false
     }
   },
   components: {

   },
   methods: {
     toggleShow(){
       this.isShow = this.isShow
     }
   }
 }
</script>

<style>
.cursor{
  cursor: pointer;
}
 
</style>
