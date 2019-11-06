<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in msg" :key="item.id">
        <router-link :to="'/home/newsInfo/'+ item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">
              <span>发表时间：{{item.add_time | dateFormat}}</span><span>点击{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {Toast} from 'mint-ui';
export default {
  data(){
    return {
      msg:null,
    }
  },
  created(){
    this.getNewsList();
  },
  methods:{
    getNewsList(){
      this.$http.get("api/getnewslist").then(result=>{
        if(result.body.status==0){
          this.msg = result.body.message;
        }else{
          Toast("获取新闻列表失败。");
        }
      })
    }
  }
};
</script>

<style scoped>
h1{
  font-size: 14px;
}
p{
  font-size: 11px;
  color: #226aff;
  display: flex;
  justify-content: space-between
}
</style>