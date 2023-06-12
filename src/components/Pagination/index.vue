<template>
  <div class="pagination">
    <button   @click="beforePage">上一页</button>
    <button :class="{active:1 ==Num }" @click="sendPage(1)" >1</button>
    
    <button v-show="originNum !=2 && originNum !=1 &&  originNum !=0 && originNum !=-1" >···</button>

    <button :class="{active:originNum+index ==Num }" v-for="(p,index) in dataNum" :key="index" v-show="compare(originNum+index)" @click="sendPage(originNum+index)">{{originNum+index}}</button>
    <!-- <button>4</button>
    <button>5</button>
    <button>6</button>
    <button>7</button> -->  
    
    <button v-show="pageNo+(this.continue-1)/2 < totalPage-1">···</button>
    <button :class="{active:totalPage ==Num }" @click="sendPage(totalPage)">{{totalPage}}</button>
    <button @click="afterPage">下一页</button>
    
    <button style="margin-left: 30px">共{{total}}条</button>
  </div >
</template>

<script>
  export default {
    name: "Pagination",
    data(){
        return{
            
            Num:1,
            dataNum:[],
            
            // dataNum:["item1","item2","item3","item4","item5"]
            
            

        }

    },
    mounted(){
        for (let i = 0; i < this.continue; i++) {
              this.dataNum.push(i)
            }

    },
    
    props:["pageNo", "pageSize", "total" ,"continue"],
    computed:{
        originNum(){
           return this.pageNo-(this.continue-1)/2
     
        },
        totalPage(){
            return Math.ceil(this.total / this.pageSize)
        }
        
    },
    methods:{
        beforePage(){
            // originNum+1
            this.Num = this.originNum+1
            this.x.$emit("aceeptBeforePage",this.originNum+1)

        },
        afterPage(){
            // originNum+1
            this.Num = this.originNum+3
            this.x.$emit("aceeptAfterPage",this.originNum+3)

        },
        compare(index){
            return (index < this.totalPage && index > 1)

        },  
        sendPage(value){
            this.Num = value

            this.x.$emit("aceeptPage",value)
            this.pageNumer = value  
            setTimeout(()=>{
                 console.log("@@@@",this.pageNo);
            },50)
           
            // console.log(this.pageNumber);
            // console.log(value);


        }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    activebutton{
        background-color: skyblue;
    }
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }
       
      
      &.active {
        
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>