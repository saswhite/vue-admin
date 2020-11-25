import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Root',
        redirect: '/admin'
    },
    {
        path: '/login',
        name: 'login',
        component: ()=> import('../views/Login/Login.vue')
    },
    {
        path: '/admin',
        name: 'Admin',
        component: ()=> import('../views/Admin/Admin.vue'),
        children:[
            {
                path:'restaurant',
                name:'Rest',
                component:()=> import('../views/Admin/Components/Rest/Restaurant.vue')
            },
            {
                path:'menu',
                name:'Menu',
                component:()=> import('../views/Admin/Components/Menu/Menu.vue')
            },
            {
                path:'order',
                name:'Order',
                component:()=> import('../views/Admin/Components/Order/Order.vue')
            },
        ]
    },
    {
        path:'*',
        name:'404',
        component: ()=> import('../components/notFound.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
