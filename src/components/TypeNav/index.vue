<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派机制 子组件事件由父组件代理 -->
      <div @mouseleave="resetIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过度动画 （必须带有v-show或v-if属性）-->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 点击事件委派 -->
            <div class="all-sort-list2" @click="goSearch">
              <!-- 一级导航 -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                @mouseenter="addIndex(index)"
                :class="{ cur: navIndex === index }"
              >
                <h3>
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级导航 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: navIndex === index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <!-- 三级导航 -->
                        <em
                          v-for="(c3) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
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
     
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 按需引入节流函数
import throttle from "loadsh/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      navIndex: -1,
      show: true,
    };
  },
  mounted() {
    // 判断路径，如果为搜索页面默认不展示
    if (this.$route.path !== "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState("homeStore", ["categoryList"]),
  },
  methods: {
    addIndex: throttle(function (index) {
      this.navIndex = index;
    }, 50),
    resetIndex() {
      if (this.$route.path != "/home") {
        this.show = false;
      }
      this.navIndex = -1;
    },
    goSearch(e) {
      // 获取触发点击的元素
      let element = e.target;
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      // 准备路由参数
      let location = { name: "search" };
      let query = { categoryName: categoryname };
      // 判断点击的是否为三级导航
      if (categoryname) {
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
      }
      if (this.$route.params) {
        location.params = this.$route.params;
        location.query = query;
        this.$router.push(location);
      }
    },
    enterShow() {
      this.show = true;
    },
  },
};
</script>

<style lang="less" scoped>
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
      height: 500px;
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
        }
        .cur {
          background-color: skyblue;
        }
      }
    }

    // 过度动画样式
    // 过度动画进入
    .sort-enter {
      height: 0;
    }
    // 过度动画结束
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画时间 速率
    .sort-enter-active {
      transition: all 0.3s linear;
    }

    .sort-leave-from {
      height: 461px;
    }
    .sort-leave-to {
      height: 0;
    }
    // 定义动画时间 速率
    .sort-leave-active {
      transition: all 0.3s linear;
    }
  }
}
</style>