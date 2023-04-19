<template>
  <div class="spec-preview" ref="spec">
    <img :src="imgObj?.imgUrl" ref="img1"/>
    <div class="event"  @mousemove="moveHandler"></div>
    <div class="big">
        <img :src="imgObj?.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props: ['skuImageList'],
    data() {
      return {
        currentIndex: 0
      }
    },
    computed: {
      imgObj() {
        return this.skuImageList[this.currentIndex]
      }
    },
    mounted() {
      this.$bus.$on('changeIndex',(index) => {
        this.currentIndex = index
      })
    },
    methods: {
      moveHandler(e) {
        // 获取盖子元素
        let mask = this.$refs.mask;
        let spce = this.$refs.spec;
        let big = this.$refs.big;
        // 元素的偏移 - 盒子自身宽高的一半
        let left = e.offsetX - mask.clientWidth / 2;
        let top = e.offsetY - mask.clientHeight / 2;
        // 判断超出视域的情况
        if (left < 0) left = 0;
        if (left > spce.clientWidth - mask.clientWidth)left =  spce.clientWidth - mask.clientWidth;
        if (top < 0) top = 0;
        if (top > spce.clientHeight - mask.clientHeight)top =  spce.clientHeight - mask.clientHeight;
        mask.style.left =  left + 'px';
        mask.style.top = top + 'px';
        // 为big添加两倍属性
        big.style.left = -2*left + 'px';
        big.style.top = -2*top  + 'px';
      } 
    }
  }
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
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
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

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>