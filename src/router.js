import vueRouter from 'vue-router'
import homeContainer from './components/homeContainer.vue'
import memberContainer from './components/memberContainer.vue'
import searchContainer from './components/searchContainer.vue'
import cartContainer from './components/cartContainer.vue'
import newsList from './components/home/newsList.vue'
import newsInfo from './components/home/newsInfo.vue'
import photoList from './components/home/photoList.vue'
import photoInfo from './components/home/photoInfo.vue'

var router = new vueRouter({
    routes:[
        {path:'/', redirect:'/home'},
        {path:'/home', component: homeContainer},
        {path:'/member', component: memberContainer},
        {path:'/search', component: searchContainer},
        {path:'/cart', component: cartContainer},
        {path:'/home/newslist',component:newsList},
        {path:'/home/newsInfo/:id', component:newsInfo},
        {path:'/home/photolist',component:photoList},
        {path:'/home/photoinfo/:id',component:photoInfo}

    ],
    linkActiveClass:'mui-active'
})

export default router