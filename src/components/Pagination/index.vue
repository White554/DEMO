<template>
  <!-- 分页器 -->
  <div class="pagination">
    <button @click="pageSubtract" :disabled="pageNo == 1">上一页</button>
    <button v-show="startNumAndEndNum.start > 1" @click="changePage(1)">
      1
    </button>
    <button v-show="startNumAndEndNum.start > 2">...</button>

    <button
      v-for="item in startNumAndEndNum.end"
      :key="item"
      v-show="item >= startNumAndEndNum.start"
      :class="pageNo === item ? 'active' : ''"
      @click="changePage(item)"
    >
      {{ item }}
    </button>

    <button v-show="startNumAndEndNum.end + 1 < totalPage">...</button>
    <button
      v-show="startNumAndEndNum.end < totalPage"
      @click="changePage(totalPage)"
    >
      {{ totalPage }}
    </button>
    <button style="margin-left: 5px">共{{ total }}条</button>
    <button @click="pageAdd" :disabled="pageNo === totalPage">下一页</button>
  </div>
</template>
 
<script>
export default {
  name: "Pagination",
  data() {
    return {
      pageArr: [],
      // 当前页码
      pageNum: this.pageNo,
    };
  },
  props: ["pageNo", "pageSize", "continues", "total"],
  methods: {
    changePage(num) {
      this.$emit("pageChange",num);
    },
    pageAdd() {
      if (this.pageNum + 1 > this.totalPage) {
        return;
      } else {
        this.pageNum += 1;
        this.$emit("pageChange", this.pageNum);
      }
    },
    pageSubtract() {
      if (this.pageNum - 1 < 1) {
        return;
      } else {
        this.pageNum -= 1;
        this.$emit("pageChange", this.pageNum);
      }
    },
  },
  computed: {
    // 计算出连续页码的起止数字
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startNumAndEndNum() {
      //算出连续页码:开始与结束这两个数字
      let start = 0,
        end = 0;
      const { totalPage, continues, pageNo } = this;
      //特殊情况:总共页数小于连续页码数
      if (totalPage < continues) {
        start = 1;
        end = totalPage;
      } else {
        //正常情况：分页器总页数大于连续页码数
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        //约束start|end在合理范围之内
        //约束头部
        if (start < 1) {
          start = 1;
          end = continues;
        }
        //约束尾部
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
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
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>