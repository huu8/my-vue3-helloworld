import { createRouter, createWebHistory } from 'vue-router'
const routes: [
	{ path: string; name: string; component: any; children: Array<any> }
] = [
	{
		path: '/',
		name: 'main',
		component: () => import('../views/Main.vue'),
		children: [
			{
				path: '/',
				name: 'home',
				component: () => import('../views/home/Home.vue'),
			},
		],
	},
]
const router = createRouter({
	history: createWebHistory(),
	routes,
})
export default router
