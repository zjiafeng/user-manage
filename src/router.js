import Vue from 'vue'
import Router from 'vue-router'
import dlu from './views/dlu.vue'
import shouye from './components/shouye.vue'
import shop from './components/shop.vue'
import ddan from './components/ddan.vue'
import userlist from './components/userlist.vue'
import detail from './components/detail.vue'
import pinlei from './components/pinlei.vue'
import ispinlei from './components/ispinlei.vue'
import shopdetail from './components/shopdetail.vue'
import addshop from './components/addshop.vue'
// import isaddshop from './components/isaddshop.vue'
import addpinlei from './components/addpinlei.vue'
import {Message} from 'element-ui';

Vue.use(Router)

var router = new Router({
	mode: 'hash',
	base: process.env.BASE_URL,

	routes: [{
			path: '/',
			redirect: '/dlu'
		},
		{
			path: '/dlu',
			name: 'dlu',
			component: dlu
		},
		{
			path: '/index',
			name: 'index',
			component: () => import('./views/index.vue'),
			redirect: '/index/shouye',
			children: [
				{
					path: '/index/shouye',
					name: 'shouye',
					component: shouye,
				},
				{
					path: '/index/shop',
					name: 'shop',
					component:shop,
				},
				{
					path: '/index/shop/shopdetail/:id',
					name: 'shopdetail',
					component:shopdetail,
				},
				{
					path: '/index/shop/addshop/:id',
					name: 'addshop',
					component:addshop,
				},
				{
					path: '/index/shop/addshop',
					name: 'addshop2',
					component:addshop,
				},
				{
					path: '/index/pinlei',
					name: 'pinlei',
					component:pinlei,
				},
				{
					path: '/index/pinlei/:id',
					name: 'ispinlei',
					component:ispinlei,
				},
				{
					path: '/index/addpinlei',
					name: 'addpinlei',
					component:addpinlei,
				},
				{
					path: '/index/ddan',
					name: 'ddan',
					component: ddan,
				},
				{
					path: '/index/userlist',
					name: 'userlist',
					component: userlist,
				},
				{
					path: '/index/detail/:orderNo',
					name: 'detail',
					component: detail,
				}
			]
		}
	]
})
router.beforeEach((to, from, next) => {
	if (to.name == 'dlu') {
		next()
	} else {
		//查看本地存储中有没有用户登录的信息
		var userlogin = sessionStorage.getItem('userinfo');
		if (userlogin && JSON.parse(userlogin).username) {
			next();
		} else {
			Message({
				message: '请先登录！',
				type: 'warning'
			});
			setTimeout(() => {
				next({
					path: '/dlu'
				});
			}, 2000);
		}
	}
})
export default router
