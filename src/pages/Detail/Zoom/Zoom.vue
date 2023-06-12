<template>
  <div class="spec-preview">
    <!-- {{skuImageList[0].imgUrl}} -->
    <img :src="ImgUrl" />
    <div class="event" @mousemove="hander"></div>
    <div class="big" >
      <img :src="ImgUrl" ref="big"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      index: 0,
    };
  },
  computed: {
    ImgUrl() {
      // 在计算属性中使用prop的值，而不直接修改prop
      return this.skuImageList[this.index].imgUrl;
    },
  },
  mounted() {
    this.x.$on("getImageUrl", (index) => {
      console.log("Zoom组件已接受:", index);
      this.index = index;

      // this.ImgUrl = imageUrl;
    });
  },
  methods:{
    hander(event){
      // console.log(this.$refs.mask.offsetWidth/2);
      // console.log(event.offsetX);

      let left = event.offsetX-this.$refs.mask.offsetWidth/2
      let top = event.offsetY-this.$refs.mask.offsetWidth/2
      if(left<0) left = 0
      if(left>=this.$refs.mask.offsetWidth) left = this.$refs.mask.offsetWidth
      if(top<0) top = 0
      if(top>=this.$refs.mask.offsetWidth) top = this.$refs.mask.offsetWidth
      this.$refs.mask.style.top = top+"px"
      this.$refs.mask.style.left = left+"px"
      this.$refs.big.style.top = -2*top+"px"
      this.$refs.big.style.left = -2*left+"px"



    }
  }
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%; 
    height: 50%;
    background-color: rgba(11, 18, 7, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>