// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import './lib/mui/fonts/mui-icons-extra.ttf'
import vueRouter from 'vue-router'
import router from './router'

// 导入mint-ui组件
// import { Header, Swipe, SwipeItem, Button, Lazyload} from 'mint-ui'
// Vue.use(Lazyload)
// Vue.component(Button.name, Button)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Header.name, Header)
import mint from 'mint-ui'
Vue.use(mint)
import 'mint-ui/lib/style.css'

// 导入vue-preview缩略图组件
import preview from 'vue-preview'
Vue.use(preview);

import vueResource from 'vue-resource'
import moment from 'moment'
Vue.use(vueRouter)
Vue.use(vueResource)
Vue.config.productionTip = false

Vue.http.options.root = 'http://www.liulongbin.top:3005/';
Vue.http.options.emulateHTTP = true;

Vue.filter('dateFormat',function(dateStr,pattern="YYYY-MM-DD hh:mm:ss"){
  return moment(dateStr).format(pattern);
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
