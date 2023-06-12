<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul  class="cart-list"    v-for="(cart, index) in cartInfoList" :key="cart.id" >  
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked == 1" @click="changeChecked($event, cart.skuNum * cart.cartPrice, index)"/>        
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="minNum(index)">-</a>
            <input
              autocomplete="off"
              type="text"
              v-model="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="fun($event,index,cart.skuNum)"/>            
            <a href="javascript:void(0)" class="plus" @click="addNum(index)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a  class="sindelet" @click="deleGoods(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 结算业务 -->
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" ref="checkAllBox" type="checkbox" @clitradeck="allChecked($event)" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deletSelectedAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价(不含运费):</em>
          <i class="summoney">{{ totalNum }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn"  @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  data() { 
    return {
      totalNum: 0,
    };
  },
  mounted() {
    this.getData();
    setTimeout(()=>{
      let cartInfoList = this.cartList.cartInfoList || [];
       for(let i = 0 ; i < cartInfoList.length ; i++ ){
        cartInfoList[i].preValue = cartInfoList[i].skuNum
       }   
    },1500)
  },
  methods: {
    deletSelectedAll(){
      // console.log(123);

      const result = this.cartInfoList.filter(word => word.isChecked == 1);

      console.log(result);
      for(let i = 0; i<result.length;i++){
        console.log(result[i].skuId);
        this.$store.dispatch("deleGoods",result[i].skuId)
        this.getData();
      }
      


    },
    async deleGoods(cart){
      console.log(cart);
      await this.$store.dispatch("deleGoods",cart.skuId)
      this.getData();
      

    },
    allChecked(event) {
      if (event.target.checked) {
        // console.log(123);
        for (let i = 0; i < this.cartInfoList.length; i++) {
          if (this.cartInfoList[i].isChecked == 0) {
             this.cartInfoList[i].isChecked = 1;
             this.cartInfoList[i].skuNum = 1
             console.log(i);
          }
        }
      } else {
        for (let i = 0; i < this.cartInfoList.length; i++) {
          this.cartInfoList[i].isChecked = 0;
          this.cartInfoList[i].skuNum = 0
        }
      }
    },
    fun(event,index,value) {
      // if(this.cartInfoList[index].preValue == undefined){
      //    this.cartInfoList[index].preValue=
      //    console.log(this.cartInfoList[index].skuNum);

      // }
      // console.log(value-this.cartInfoList[index].preValue );
      if(event.target.value*1 !=NaN  && event.target.value > 0 ){
        // console.log(111);
        value = Math.ceil(value)
        this.cartInfoList[index].skuNum = value
        this.$store.dispatch("reqAddOrUpdateShopCart",{skuId:this.cartInfoList[index].skuId,skuNum:value-this.cartInfoList[index].preValue})
        this.cartInfoList[index].preValue = value 
        if (this.cartInfoList[index].skuNum < 1) {
          this.cartInfoList[index].isChecked = 0;
          } else {
          this.cartInfoList[index].isChecked = 1;
          }
      }else{
        this.cartInfoList[index].skuNum = 1
        value = 1
        this.$store.dispatch("reqAddOrUpdateShopCart",{skuId:this.cartInfoList[index].skuId,skuNum:value-this.cartInfoList[index].preValue})
        this.cartInfoList[index].preValue = value 
        if (this.cartInfoList[index].skuNum < 1) {
          this.cartInfoList[index].isChecked = 0;
          } else {
          this.cartInfoList[index].isChecked = 1;
          }
        
      }





      
    },
    getData() {
      this.$store.dispatch("reqCartList");
    },
    changeChecked(event, changeTotalPrice, index) {
      console.log(event.target.checked);
      if (event.target.checked) {
        
        this.cartInfoList[index].skuNum = 1;
        this.cartInfoList[index].isChecked = 1;
        this.totalNum = this.totalNum + this.cartInfoList[index].cartPrice;
        this.$store.dispatch("reqAddOrUpdateShopCart",{skuId:this.cartInfoList[index].skuId,skuNum:+1}) 


      } else {
        this.totalNum = this.totalNum - changeTotalPrice;
        this.$store.dispatch("reqAddOrUpdateShopCart",{skuId:this.cartInfoList[index].skuId,skuNum:-this.cartInfoList[index].skuNum}) 
        this.cartInfoList[index].skuNum = 0;
        this.cartInfoList[index].isChecked = 0;
        
      }
    },
    addNum(index) {
      this.cartInfoList[index].isChecked = 1;
      this.cartInfoList[index].skuNum++;
      this.totalNum = this.totalNum + this.cartInfoList[index].cartPrice;
      this.$store.dispatch("reqAddOrUpdateShopCart",{skuId:this.cartInfoList[index].skuId,skuNum:+1})
      
    },
    minNum(index) {
      if (this.cartInfoList[index].skuNum > 0) {
        if (this.cartInfoList[index].skuNum > 1) {
          this.cartInfoList[index].skuNum--;
          this.totalNum = this.totalNum - this.cartInfoList[index].cartPrice;
          this.$store.dispatch("reqAddOrUpdateShopCart",{skuId:this.cartInfoList[index].skuId,skuNum:-1})
        } else if (this.cartInfoList[index].skuNum <= 1) {
          this.cartInfoList[index].isChecked = 0;
          this.cartInfoList[index].skuNum--;
          this.totalNum = this.totalNum - this.cartInfoList[index].cartPrice;
        }
      }
    },
  },
  computed: {
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
  },
  watch: {
    cartInfoList: {
      handler(newVal, oldVal) {
        // 处理对象值的变化

        this.totalNum = 0;
        this.$refs.checkAllBox.checked = this.cartInfoList.every(items=>  items.isChecked == 1)
        for (let i = 0; i < this.cartInfoList.length; i++) {
          if(this.cartInfoList[i].isChecked !=1){
            this.$refs.checkAllBox.checked = false
          }
          
          this.totalNum =
            this.totalNum +
            this.cartInfoList[i].skuNum * this.cartInfoList[i].cartPrice;
          // console.log(this.totalNum);
        }
      },
      deep: true, // 开启深度监视
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        // .cart-list-con3 {
        //   width: 20.8333%;

        //   .item-txt {
        //     text-align: center;
        //   }
        // }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>