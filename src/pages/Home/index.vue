<template>
  <div>
      
    <!-- 三级联动的组件 （全局）-->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(carousel) in reqGetFloorList" :key="carousel.id" :message="carousel"></Floor>
   
    <Brand></Brand>   
                          
  </div>
</template>

<script>
//引入其余局部组件
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'


export default {
    name:'Home',
    computed:{
      reqGetFloorList(){
        return this.$store.state.home.reqGetFloorList
      }

    },
    mounted() {
      // console.log("@@@",this.$route);
      // console.log(this.$store.state.home.a)

      this.$store.dispatch("reqGetFloorList");
      // console.log(this.$store.state.home.reqGetFloorList);

       //派发获取用户信息！！
       this.$store.dispatch("reqGetUserInfo");
      


    
    },
    components:{
      ListContainer,
      Recommend,
      Rank,
      Like,
      Floor,
      Brand

    }

}
</script>

<style>

</style>