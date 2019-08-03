import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/players/:takim_id',
            name: 'PlayersByTeam',
            component: () => import(/* webpackChunkName: "about" */ './views/Players.vue')
        },
        {
            path: '/players',
            name: 'Players',
            component: () => import(/* webpackChunkName: "about" */ './views/Players.vue')
        },
        {
            path: '/teams',
            name: 'Teams',
            component: () => import(/* webpackChunkName: "about" */ './views/Teams.vue')
        },
    ]
})
