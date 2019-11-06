<template>
  <div>
    <!-- 顶部滚动栏 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id==0?'mui-active':'']"
            v-for="item in photoCategary"
            :key="item.id"
            @tap="getPhotoList(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul>
      <router-link v-for="item in photoList" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
        <img v-lazy="item.img_url" />
        <div class="info">
          <h3 class="info-title">{{item.title}}</h3>
          <div class="info-main">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.js";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      photoCategary: [],
      photoList:[]
    };
  },
  mounted() { 
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  created() {
    this.getPhotoCategary();
    this.getPhotoList(0);
  },
  methods: {
    getPhotoCategary() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          result.body.message.unshift({
            title: "全部",
            id: 0
          });
          this.photoCategary = result.body.message;
        } else {
          Toast("获取图片分类失败。");
        }
      });
    },
    getPhotoList(id){
      this.$http.get("api/getimages/"+id).then(result=>{
        if(result.body.status === 0){
          this.photoList = result.body.message;
        }else{
          Toast("获取图片列表失败。");
        }
      })
    }
  }
};
</script>

<style scoped>
* {
  touch-action: pan-y;
}
img[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
ul{
  list-style: none;
  padding-left:0; 
  margin: 0;
}
li{
  background-color: #ccc;
  text-align: center;
  margin:0 10px;
  margin-bottom: 10px;
  padding: 0;
  position: relative;
}
img{
  width: 100%;
  vertical-align: middle;
  box-shadow: 0 0 9px #999;
}
.info{
  position: absolute;
  padding: 0 5px;
  z-index: 5;
  color: white;
  max-height: 75px;
  text-align: left;
  bottom: 0;
  line-height: 18px;
  background-color: rgba(0,0,0,0.4);
  overflow: hidden;
}
.info-title{
  font-size: 12px;
}
.info-main{
  font-size: 12px;
}
</style>