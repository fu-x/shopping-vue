<template>
  <div class="swipe">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in swipe" :key="item.id">
        <img :src="item.img" :class="{'full':isfull}"/>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  props:['swipe','isfull'],
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  text-align: center;
  
img {
  height: 100%;
}
.full{
  width: 100%;
}
}
</style>