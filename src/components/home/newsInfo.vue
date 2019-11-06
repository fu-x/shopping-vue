<template>
  <div class="newsInfo-container">
      <!-- 标题 -->
    <h3 class="newsInfo-title">{{msg.title}}</h3>

    <!-- 子标题 -->
    <p class="newsInfo-subtitle">
      <span>发表时间：{{msg.add_time | dateFormat}}</span>
      <span>点击{{msg.click}}次</span>
    </p>
    <hr />
    <!-- 内容 -->
    <div v-html="msg.content"></div>

    <!-- 评论 -->
    <comment-box :id="this.newsId"></comment-box>
  </div>
</template>

<script>
import {Toast} from "mint-ui"
import comment from "./comment.vue"

export default {
    data(){
        return{
            newsId: this.$route.params.id,
            msg:"",
        }
    },
    created(){
        this.getNewsInfo();
    },
    methods:{
        getNewsInfo(){
            this.$http.get('api/getnew/'+this.newsId).then(result=>{
                if(result.body.status === 0){
                    this.msg = result.body.message[0];
                }else{
                    Toast("获取新闻内容失败。");
                }
            })
        }
    },
    components:{
        "comment-box":comment
    }
};
</script>

<style scoped>
.newsInfo-container{
    margin:0 4px;
}
.newsInfo-title {
  font-size: 16px;
  color: red;
  text-align: center;
  margin-top: 10px;
}
.newsInfo-subtitle {
  font-size: 12px;
  color: #226aff;
  display: flex;
  justify-content: space-between;
}
</style>