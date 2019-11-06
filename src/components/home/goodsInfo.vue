<template>
  <div class="goods-info">
      <div class="mui-card">
				<div class="mui-card-content">
						<swiper :swipe="swiperList" :isfull="isfull"></swiper>
				</div>
			</div>
			<div class="mui-card">
				<div class="mui-card-header">{{goodsInfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
              市场价：<del>￥{{goodsInfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now">￥{{goodsInfo.sell_price}}</span>
            </p>
            <p>购买数量：<number-box></number-box></p>
            <p>
              <mt-button type="primary" size="small">立即购买</mt-button>
              <mt-button type="danger" size="small">加入购物车</mt-button>
            </p>
					</div>
				</div>
			</div>
      <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号：{{goodsInfo.goods_no}}</p>
						<p>库存情况：{{goodsInfo.stock_quantity}}件</p>
						<p>上架时间：{{goodsInfo.add_time}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
          <mt-button type="primary" size="large" plain>图文介绍</mt-button>
          <mt-button type="danger" size="large" plain>商品评论</mt-button>
        </div>
			</div>
  </div>
</template>

<script>
import swiper from '../swipe.vue'
import {Toast} from 'mint-ui'
import numberBox from '../numberBox.vue'
export default {
  data() {
    return{
      id: this.$route.params.id,
      swiperList:[],
      isfull:false,
      goodsInfo:{}
    }
  },
  created(){
    this.getSwiperList();
    this.getGoodsInfo();
  },
  methods:{
    getSwiperList(){
      this.$http.get("api/getthumimages/"+this.id).then(result=>{
        if(result.body.status === 0){
          this.swiperList = result.body.message;
          this.swiperList.forEach(ele=>{
            ele.img = ele.src;
          })
        }else{
          Toast("加载图片失败。");
        }
      })
    },
    getGoodsInfo(){
      this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
        console.log(result.body);
        if(result.body.status === 0){
          this.goodsInfo = result.body.message[0];
        }else{
          Toast("加载商品信息失败。");
        }
      })
    }
  },
  components:{
    swiper,
    numberBox
  }
}
</script>

<style lang="scss" scoped>
.goods-info{
  .now{
    color: red;
    font-size: 16px;
  }
  .mui-card-footer{
    display: block;
    .mint-button{
      margin: 10px 0;
    }
  }
}
</style>