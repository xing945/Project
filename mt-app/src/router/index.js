import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'default',
		component: () => import('@/layout/default.vue'),
		redirect: '/index',
		children: [
			{
				path: 's/:name',
				name: 'goods',
				component: () => import('@/views/Goods.vue'),
            },
            {
                path:'/index',
                name:'index',
                component:()=>import('@/views/Page.vue')
            },
            {
                path:'/changeCity',
                name:'changeCity',
                component:()=>import('@/views/ChangeCity.vue')
            }
		],
    },
    {
        path:'/login',
        name:'login',
        component: () => import('@/views/Login.vue'),
    },
    {
        path:'/register',
        name:'register',
        component: () => import('@/views/Register.vue')
    }
]

const router = new VueRouter({
	mode: 'history',
	routes,
})

export default router
