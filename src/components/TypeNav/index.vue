<template>
  <div class="type-nav">
    <!-- <h1>{{category List}}</h1> -->

    <div class="container" @mouseenter="appered" @mouseleave="disappered">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="sort">
        <div class="sort" v-show="show">
        <div class="all-sort-list2" @click="geSearch">
          <div  class="item"   v-for="p in categoryList"   :key="p.categoryId"   :class="{ to: p.categoryId == 1,   bkg: p.categoryId == currentIndex,}" @mouseenter="fun(p.categoryId)">
         <h3  :data-categoryName="p.categoryName"  :data-category1Id="p.categoryId"    >
              <!-- <a href="">{{ p.categoryName }}</a> -->
              <a :data-categoryName="p.categoryName"   :data-category1Id="p.categoryId">{{ p.categoryName }}</a>          
            </h3>
            <div  class="item-list clearfix"  :class="{ block: p.categoryId == currentIndex }" >
              <div class="subitem">
                <dl class="fore" v-for="q in p.categoryChild"  :key="q.categoryId">
                  <dt>
                    <a :data-categoryName="q.categoryName"  :data-category1Id="q.categoryId" >{{ q.categoryName }}</a>
                  </dt>
                  <dd>
                    <em v-for="r in q.categoryChild" :key="r.categoryId">
                      <a :data-categoryName="r.categoryName" :data-category1Id="r.categoryId"  >{{ r.categoryName }}</a
                       
                        
                      
                      >
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>     
      </transition>
      
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: "",
      show: "",
    };
  },
  methods: {
    
    appered() {
      if (this.$route.path !== "/home") {
        this.show = !this.show;
      }
    },
    disappered() {
      if (this.$route.path !== "/home") {

        this.show = !this.show;
        this.currentIndex = -1;
        
      }
      this.currentIndex = -1;
    },

    fun: _.throttle(function (num) {
      this.currentIndex = num;
      // console.log(num);
    }, 50),
    geSearch(e) {
      // console.log(e.target.dataset);

      let {categoryname, category1id } = e.target.dataset;
      // console.log(categoryname, category1id);

      if (e.target.tagName == "A" || e.target.tagName == "H3") {

        this.$router.push({
          name: "search",  //这个公共组件跳转的路由是serach
          query: {
            keyword1: categoryname,
            keyword2: category1id,
          },
          // params:{
          //   keyword:this.$route.params.keyword || undefined
          // }
            
        });
      }
    },
  },
  //三级联动组件挂在完毕，服务器请求数据将组件放入state中
  mounted() {
    // this.$store.dispatch("categoryList");
    // console.log("@@@@@",this.$store.state.home);
    if (this.$route.path !== "/home") {
      this.show = false;
    }
    if (this.$route.path == "/home") {
      this.show = true;
    }
  },
  computed: {
    categoryList() {
      return this.$store.state.home.categoryList;
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
          .block {
            display: block;
          }
        }

        .bkg {
          background-color: skyblue;
        }
      }
    }
    .sort-enter{
      height: 0px;
    }
    .sort-enter-to{
      height: 461px;
    }
    .sort-enter-active{
      transition: all .3s linear;
    }
    

  }
}
</style>