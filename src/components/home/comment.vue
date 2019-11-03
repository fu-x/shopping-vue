<template>
  <div>
    <h4>发表评论</h4>
    <hr />
    <textarea placeholder="请输入评论内容（最多输入120字）" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postCmt">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,i) in cmtList" :key="item.add_time">
        <div
          class="cmt-title"
        >第{{i+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;时间:{{item.add_time | dateFormat}}&nbsp;&nbsp;</div>
        <div class="cmt-body">{{item.content === "" ? "此用户很懒，什么都没说":item.content}}</div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMoreCmt">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      cmtList: [],
      pageIndex: 1,
      msg:""
    };
  },
  created() {
    this.getCmtList();
  },
  methods: {
    getCmtList() {
      this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex).then(result => {
          if (result.body.status === 0) {
            this.cmtList = this.cmtList.concat(result.body.message);
          } else {
            Toast("获取评论列表失败。");
          }
        });
    },
    getMoreCmt() {
      this.pageIndex++;
      this.getCmtList();
    },
    postCmt(){
        if(this.msg.trim() === ""){
            return Toast("评论不能为空。");
        }
        this.$http.post("api/postcomment/" + this.id, {
            content: this.msg.trim()
        }).then(result=>{
            if(result.body.status === 0){
                var newCmt = {
                    user_name:"匿名用户",
                    add_time:Date.now(),
                    content:this.msg.trim()
                };
                this.cmtList.unshift(newCmt);
                this.msg = "";
            }
        })
    }
  },
  props: ["id"]
};
</script>

<style scoped>
h4 {
  font-size: 16px;
}
textarea {
  font-size: 12px;
  height: 80px;
  margin: 0;
}
.cmt-list {
  margin: 5px 0;
}
.cmt-title {
  background-color: #ccc;
  line-height: 30px;
  font-size: 12px;
}
.cmt-body {
  font-size: 13px;
  line-height: 30px;
}
</style>