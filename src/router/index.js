import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import axios from 'axios'

import login from '../login/login.vue'
import homea from '../home/homea.vue'
import choosestudent from '../page/choosestudent.vue'
import chooseteacher from '../page/chooseteacher.vue'
import dict from '../page/dict.vue'
import mychoose from '../page/mychoose.vue'
import mystudent from '../page/mystudent.vue'
import role from '../page/role.vue'
import student from '../page/student.vue'
import teacher from '../page/teacher.vue'
import user from '../page/user.vue'
import info from '../page/info.vue'
import pwd from '../page/pwd.vue'
import notfound from '../page/notfound.vue'

Vue.use(VueRouter)

// router文件夹-->index.js文件
//cv以下代码解决路由地址重复的报错问题(一劳永逸)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const routes = [
	{
		path:'/',
		name:'login',
		component: login
	}
]

const dynamicRoutes = [
	{ path:'/choosestudent',name:'choosestudent',component: choosestudent },
	{ path:'/chooseteacher',name:'chooseteacher',component: chooseteacher },
	{ path:'/dict',name:'dict',component: dict },
	{ path:'/mychoose',name:'mychoose',component: mychoose },
	{ path:'/mystudent',name:'mystudent',component: mystudent },
	{ path:'/role',name:'role',component: role },
	{ path:'/student',name:'student',component: student },
	{ path:'/teacher',name:'teacher',component: teacher },
	{ path:'/user',name:'user',component: user },
	{ path:'/info',name:'info',component: info },
	{ path:'/pwd',name:'pwd',component: pwd }
]

//初始化对象
const router = new VueRouter({
	routes
})

 function getUserRoutes(per){
	// console.log(per)
	//获取登录用户的菜单
	let ary = []
	for(let i = 0;i < per.length;i++){
		//如果有子菜单，则从子菜单中匹配
		if(per[i].children && per[i].children.length > 0){
			per[i].children.forEach((item,i)=>{
				let rt = dynamicRoutes.find((r) => r.name == item.name)
				ary.push(rt)
			})
		}else{
			let rt = dynamicRoutes.find((r) => r.name == per[i].name)
			ary.push(rt)
		}
	}
	// console.log(ary)
	return ary
}


// 全局导航守卫
router.beforeEach((to,from,next) => {
	// console.log('守卫',store.state.per)
	let curruser = store.state.cuser
	if(!store.state.per || store.state.per.length == 0){
		let role = curruser.role
		axios.get('/api/pom.json').then((p)=>{
			// console.log(p)
			let per = p.data.data[role]
			
			//通过菜单和动态路由比对
			let dr = per && getUserRoutes(per)
			
			//把路由添加到router中
			let temp = {
				path:'/homea',
				name:'homea',
				component: homea,
				children:dr
			}
			let not = {
				path:'*',
				name:'notfound',
				component: notfound
			}
			router.addRoutes([temp,not])
			
			//把存入vuex
			store.commit('setPer',per)
		})
	}
	// console.log(curruser)
	if(curruser.id){
		next()
	}else{
		if(to.path == '/'){
			next()
		}else{
			next('/')
		}
	}
	
	
})

export default router;