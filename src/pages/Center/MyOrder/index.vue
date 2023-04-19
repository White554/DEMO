<template>
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">
        <table class="order-item" v-for="item in records" :key="item.id">
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle"
                  >2017-02-11 11:59　订单编号：{{item.outTradeNo}}
                  <span class="pull-right delete"
                    ><img src="../images/delete.png"   style="width:30px; height:30px"></span
                ></span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td width="60%">
              </td>
              <td rowspan="2" width="8%" class="center">{{item.consignee}}</td>
              <td rowspan="2" width="13%" class="center">
                <ul class="unstyled">
                  <li>总金额¥138.00</li>
                  <li>在线支付</li>
                </ul>
              </td>
              <td rowspan="2" width="8%" class="center">
                <a href="#" class="btn">已完成 </a>
              </td>
              <td rowspan="2" width="13%" class="center">
                <ul class="unstyled">
                  <li>
                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td width="50%" style="flex-direction: column ;">
                <div class="typographic" v-for="good in item.orderDetailList" :key="good.id" >  
                  <img :src="good.imgUrl" />
                  <a href="#" class="block-text"
                    >{{good.skuName}}</a
                  >
                  <span>x{{good.skuNum}}</span>
                  <a href="#" class="service">售后申请</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="choose-order">
        <div class="pagination">
          <ul>
            <li class="prev disabled">
              <a href="javascript:">«上一页</a>
            </li>
            <li class="page actived">
              <a href="javascript:">1</a>
            </li>
            <li class="page">
              <a href="javascript:">2</a>
            </li>
            <li class="page">
              <a href="javascript:">3</a>
            </li>
            <li class="page">
              <a href="javascript:">4</a>
            </li>

            <li class="next disabled">
              <a href="javascript:">下一页»</a>
            </li>
          </ul>
          <div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;共2页&nbsp;</span>
          </div>
        </div>
      </div>
    </div>
    <!--猜你喜欢-->
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike01.png" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">已有6人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike02.png" />
          </div>
          <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike03.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike04.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {reqOrderList} from '@/api'
export default {
    name: 'myOrder',
      data() {
    return {
      page: 1,
      limit: 3,
      orderList: {}
    }
  },
  mounted() {
    this.getOrderList()
  },
  methods: {
    // 获取订单列表
    async getOrderList() {
      let {page, limit} = this
      let resutlt = await reqOrderList(page, limit)
      if(resutlt.code === 200) {
        this.orderList = resutlt.data
      }
    }
  },
  computed: {
    records() {
      return this.orderList.records 
    }
  }
};
</script>

<style>
</style>