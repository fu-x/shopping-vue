<template>
  <div class="goods-list">
    <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="toGoodsInfo(item.id)">
      <img :src="item.img_url" alt="">
      <h3 class="title">{{item.title}}</h3>
      <div class="info">
        <p class="price">
          <span class="new">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩余{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMoreGoods">加载更多</mt-button>
  </div>
</template>

<script>
import {Toast} from "mint-ui"
export default {
  data(){
    return {
      goodsList:[],
      indexPage:1
    }
  },
  created(){
    this.getGoodsList();
  },
  methods:{
    getGoodsList(){
      this.$http.get('api/getgoods?pageindex='+this.indexPage).then(result=>{
        if(result.body.status === 0){
          this.goodsList = this.goodsList.concat(result.body.message);
        }else{
          Toast("获取商品列表失败。");
        }
      })
    },
    getMoreGoods(){
      this.indexPage++;
      this.getGoodsList();
    },
    toGoodsInfo(id){
      this.$router.push({name:"goodsinfo",params:{ id }});
    }
  }
}
</script>

<style lang="scss">
  .goods-list{
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
    .goods-item{
      border: 1px solid #ccc;
      box-shadow: 0 0 8px #bbb;
      width: 49%;
      margin: 4px 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 271px;
      img{
        width: 100%;
      }
      .title{
        font-size: 14px;
      }
      .info{
        margin: 1px;
        background-color: #eee;
        p{
          margin: 0;
          padding: 5px;
        }
        .price{
          .new{
            font-size: 16px;
            color: red;
          }
          .old{
            margin-left: 5px;
            font-size: 12px;
            text-decoration: line-through;
          }
        }
        .sell{
          font-size: 13px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
</style>