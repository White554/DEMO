<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="removeCategory">×</i>
            </li>
            <!-- 搜索关键字面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removekeyword">×</i>
            </li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 售卖属性面包屑 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="attrValue.split(':')[0]"
            >
              {{ attrValue.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @changeTdName="getTdData" @addAttr="addAttrArray" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changOrder('1')">
                  <a
                    >综合
                    <span v-show="isOne" class="iconfont">{{
                      isUp ? "&#xe64a;" : "&#xe65b;"
                    }}</span></a
                  >
                </li>
                <li :class="{ active: isTwo }" @click="changOrder('2')">
                  <a
                    >价格
                    <span v-show="isTwo" class="iconfont">{{
                      isUp ? "&#xe64a;" : "&#xe65b;"
                    }}</span></a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 路由跳转带id -->
                    <router-link :to="`detail/${goods.id}`">
                      <img v-lazy="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i> {{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器组件 -->
            <Pagination
              :total="total"
              :pageSize="pageSize"
              :pageNo="pageNo"
              :continues="3"
              @pageChange="pageChange"
            ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector.vue";
import { mapGetters } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        // 三级分类id
        category1Id: "",
        category2Id: "",
        category3Id: "",
        // 分类名字
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序
        order: "1:desc",
        // 当前页码
        pageNo: 1,
        // 每一页展示的数量
        pageSize: 8,
        // 售卖属性参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  beforeMount() {
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 获取展示数据
    getData() {
      this.$store.dispatch("searchStore/postSearchInfo", this.searchParams);
    },
    // 面包屑删除三级分类标签事件
    removeCategory() {
      // 清空参数 重新发请求
      // 属性值为空还是会带给服务器，如果undefined不会带给服务器
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      // 地址栏路径重写 删除的是query参数，params参数需要保留
      this.$router.push({
        name: "search",
        params: this.$route.params ? this.$route.params : undefined,
      });
    },
    // 面包屑删除关键字处理事件
    removekeyword() {
      // 清空参数 重新发请求
      // 属性值为空还是会带给服务器，如果undefined不会带给服务器
      this.searchParams.keyword = undefined;
      this.getData();
      // 通知兄弟组件清除关键字
      this.$bus.$emit("clear");
      // 地址栏路径重写 删除的是parmas参数，query参数需要保留
      this.$router.push({
        name: "search",
        query: this.$route.query ? this.$route.query : undefined,
      });
    },
    // 面包屑删除品牌标签处理事件
    removeTrademark() {
      // 清空参数 重新发请求
      // 属性值为空还是会带给服务器，如果undefined不会带给服务器
      this.searchParams.trademark = undefined;
      this.getData();
      // 地址栏路径重写 判断路由参数是否需要保留
      this.$router.push({
        name: "search",
        params: this.$route.params ? this.$route.params : "",
        query: this.$route.query ? this.$route.query : undefined,
      });
    },
    // 面包屑删除售卖属性
    removeAttr(index) {
      // 整理搜索参数，清楚对应售卖属性   在对应索引位置删除一个元素
      this.searchParams.props.splice(index, 1);
      // 发请求获取新的数据
      this.getData();
    },
    // 添加品牌属性事件
    getTdData(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    // 添加售卖属性事件
    addAttrArray(attr) {
      // 数组去重
      if (this.searchParams.props.indexOf(attr) === -1) {
        this.searchParams.props.push(attr);
      }
      this.getData();
    },
    // 修改排序方式的处理事件
    changOrder(orderNum) {
      var mes = this.searchParams.order.split(":");
      // 判断点击的是否是已选中的排序模块
      if (mes[0] == orderNum) {
        // 调转升降序状态
        this.searchParams.order =
          mes[1] === "asc" ? `${mes[0]}:desc` : `${mes[0]}:asc`;
      } else {
        // 选中新的排序逻辑 默认排序为降序
        this.searchParams.order = `${orderNum}:desc`;
      }
      this.getData();
    },
    // 页码变化处理函数
    pageChange(pageNum) {
      this.searchParams.pageNo = pageNum;
      this.getData();
    },
  },
  components: {
    SearchSelector,
  },
  computed: {
    // 从search仓库获取展示数据
    ...mapGetters("searchStore", [
      "goodsList",
      "trademarkList",
      "attrsList",
      "pageNo",
      "pageSize",
      "total",
      "totalPages",
    ]),
    // 判断排序方式和选中状态
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isUp() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
  },
  watch: {
    // 监听路由变化
    $route: {
      handler: function (newVal, oldVal) {
        // 每次请求前清空数据
        this.searchParams.category1Id = "";
        this.searchParams.category2Id = "";
        this.searchParams.category3Id = "";
        // 合并对象
        Object.assign(this.searchParams, this.$route.query, this.$route.params);
        this.getData();
      },
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
    }
  }
}
</style>