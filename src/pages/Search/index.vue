<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果:</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 三级面包屑 -->
            <li class="with-x" v-show="searchParams.categoryName">{{searchParams.categoryName}}<i @click="deleBread">×</i></li>    
            <!-- 搜索面包屑 -->
            <li class="with-x" v-show="searchParams.keyword">{{searchParams.keyword}}<i @click="deleBreadkeyword">×</i></li> 
             <!--品牌面包屑  -->
             <li class="with-x" v-show="brand">{{brand}}<i @click="deletmName">×</i></li>  
             <!-- 属性面包屑 -->
             <!-- <li class="with-x" v-show="searchParams.props[0]">{{searchParams.props[searchParams.props.length-1]}}<i @click="deleProps">×</i></li>  -->
             <li class="with-x" v-for="(search,index) in searchParams.props" :key="index">{{search.split(":")[1]}}<i @click="deleProps(index)">×</i></li> 
          </ul> 
        </div>

        <!--selector-->
        <SearchSelector />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter"> 
              <!-- 价格结构 -->
              <ul class="sui-nav">
                <li  v-for="(i,index) in order" :key="index" :class="{'active':index == condition}" @click="orderline(index)">
                  <a>{{i}} <span class='iconfont'  :class="{'icon-up':searchParams.order.indexOf('asc') !=-1 ,'icon-down':searchParams.order.indexOf('desc') !=-1}" v-if="index == condition" ></span></a>
                </li>

                
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id" @click="goods(good.id)">
                <div class="list-wrap">
                  <div class="p-img">
                    <a  target="_blank"><img v-lazy="good.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html"  target="_blank"   class="sui-btn btn-bordered btn-danger">加入购物车</a>                
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="this.searchParams.pageNo" :pageSize="this.searchParams.pageSize" :total="this.$store.state.search.searchList.total" :continue="5"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters } from "vuex";

export default {
  name: "Search",
  // props:["keyword1",'keyword2'],
  data() {
    return {
      arrowhead :false,
      // breadList:[],
      condition:0,
      order:["综合","价格"],
      
      searchParams: { 
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:asc",
        pageNo:5 ,
        pageSize: 5,
        props: [],
        trademark: "",
      },
      brand:"",
      arr:[],
    };
  },
  beforeMount() {

    this.searchParams.category3Id = this.$route.query.keyword2;
    this.searchParams.categoryName = this.$route.query.keyword1;
    this.searchParams.keyword = this.$route.params.keyword;
  },
  components: {
    SearchSelector,
  },
  // beforeMount() {},
  mounted(){ 
     this.x.$on("aceeptBeforePage",(value)=>{
      this.searchParams.pageNo = value
      this.getData(this.searchParams)
    })
    this.x.$on("aceeptAfterPage",(value)=>{
      this.searchParams.pageNo = value
      this.getData(this.searchParams)
    })

    this.x.$on("aceeptPage",(value)=>{
      this.searchParams.pageNo = value
      console.log(this.searchParams.pageNo);
      this.getData(this.searchParams)
    })
    
    //触发三连环请求数据

    // this.breadList.push({categoryName:this.$route.query.keyword1,category3Id:this.$route.query.keyword2})
    
      this.getData(this.searchParams);
      this.x.$on("getBrand",(value)=>{
      // console.log(value);
       
       this.brand = value.tmName
       this.searchParams.trademark=`${value.tmId}:${value.tmName}`  
       this.getData(this.searchParams)
    }),
    //绑定全局总线，获取商品属性信息
    this.x.$on("attrsList",(Id,attributeValue,attributeName)=>{
      // console.log("我是父组件@@@",Id,attributeValue,attributeName); 
      if( this.searchParams.props.indexOf(`${Id}:${attributeValue}:${attributeName}`)==-1){
        this.searchParams.props.push(`${Id}:${attributeValue}:${attributeName}`)
      }    
      
      // console.log(this.searchParams.props);     
      this.getData(this.searchParams)


       
       
    })

    
  },
  computed: {
    query() {
      return this.$route.query;
    },
    params() {
      return this.$route.params;
    },
    //mapGetters里捞state里面加工后的数据
    ...mapGetters(["goodsList"]),
  },
  methods: {
    goods(value){
        this.$router.push({
          name: "detail",  //这个公共组件跳转的路由是detail        
          params:{
             skuid:value
           }            
        });
       
    },
      orderline(index){
      console.log(this.goodsList);
      this.condition = index
      this. arrowhead = !this.arrowhead
      if(index+1 == 1){
        
        if(this. arrowhead == true){
         this.searchParams.order = `${index+1}:asc`
         this.getData(this.searchParams)
        }else{
          this.searchParams.order = `${index+1}:desc`
         this.getData(this.searchParams)

        }
      }else if(index+1 == 2){
        
        if(this. arrowhead == true){
         this.searchParams.order = `${index+1}:asc`
         this.getData(this.searchParams)
        }else{
         this.searchParams.order = `${index+1}:desc`
         this.getData(this.searchParams)

        }
        
      }
      

      },
       deleBread(){
        this.searchParams.categoryName = ""
        this.searchParams.category3Id = ""
        
        
        this.$router.push({
          name:"search",
          params:this.$route.params
        })        
      },
      deleBreadkeyword(){ 
        this.searchParams.keyword = ""
        this.getData(this.searchParams)
        this.$router.push({
          name:"search",
          query:this.$route.query
          
        }) 

        // this.$route.params.keyword = ""
        this.x.$emit("clear")
        

      },
      deletmName(){
        this.brand = ""
        this.searchParams.trademark = ""
        this.getData(this.searchParams)
        

      },
      deleProps(index){
        this.searchParams.props.splice(index,1)
        this.getData(this.searchParams)
        console.log(this.searchParams.props);


      },
    getData(value) {
      this.$store.dispatch("reqGetSearchInfo",value);
    },
    
  },
  watch: {
    // 监听单个数据
    $route: {
      
      handler(newVal, oldVal) {
        console.log("====================");
        this.searchParams.category3Id = this.$route.query.keyword2;
        this.searchParams.categoryName = this.$route.query.keyword1;
        this.searchParams.keyword = this.$route.params.keyword;
        //触发三连环请求数据
        this.getData(this.searchParams);
        // console.log(this.searchParams.categoryName);
        
        
        // console.log(this.breadList);

      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>