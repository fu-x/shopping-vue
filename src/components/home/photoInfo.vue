<template>
  <div class="photo-container">
    <!-- 标题部分 -->
    <h3>{{photoInfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{photoInfo.add_time | dateFormat}}</span>
      <span>点击{{photoInfo.click}}次</span>
    </p>
    <hr/>

    <!-- 缩略图区域 -->
    <div class="thumbs">
      <vue-preview :slides="photoList" @close="handleClose"></vue-preview>
    </div>
    <!-- 图片内容区域 -->
    <div class="content" v-html="photoInfo.content"></div>

    <!-- 评论区域 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
import comment from './comment.vue'
import {Toast} from 'mint-ui'
export default {
  data(){
    return{
      id:this.$route.params.id,
      photoInfo:{},
      photoList:[]
    }
  },
  methods:{
    getPhotoInfo(){
      this.$http.get('api/getimageInfo/'+this.id).then(result=>{
        if(result.body.status === 0){
          this.photoInfo = result.body.message[0];
        }else{
          Toast("获取图片信息失败。");
        }
      })
    },
    getPhotoList(){
      this.$http.get('api/getthumimages/'+this.id).then(result=>{
        if(result.body.status === 0){
          console.log(result.body);
          result.body.message.forEach(element => {
            element.msrc = element.src;
            element.w = 600;
            element.h = 400;
          });
          this.photoList = result.body.message;
        }else{
          Toast("加载图片失败。");
        }
      })
    },
    handleClose(){
      console.log("close event");
    }
  },
  created(){
    this.getPhotoInfo();
    this.getPhotoList();
  },
  components:{
    'cmt-box':comment
  }
}
</script>

<style lang="scss">
.photo-container{
  padding: 5px;
  h3{
    font-size: 15px;
    color: #26a2ff; 
    text-align: center;
    margin: 15px 0;
  }
  .subtitle{
    font-size: 12px;
    display: flex;
    justify-content: space-between;
  }
  .content{
    font-size: 14px;
  }
  .thumbs{
    overflow: hidden;
    figure{
        float: left;
        width: 30%;
        height:calc(30vw - 0px);
        margin: 1.5%;
    }
    img{
      height: 100%;
      margin: 1%;
      box-shadow: 0 0 8px #999
    }
  }
}
</style>