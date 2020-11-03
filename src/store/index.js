import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
export default new Vuex.Store({
	
	state: {
		cuser:sessionStorage.getItem('curruser') ? JSON.parse(sessionStorage.getItem('curruser')) : {},//用户信息
		per:[],//菜单信息
		permission:[]
	},
	//不可异步
	mutations: {
		setUser(state,payload){
			state.cuser = payload
		},
		
		setPer(state,payload){
			state.per = payload
		},
		setPermission(state,payload){
			state.permission = payload
		}
	},
	//可异步
	actions: {
		// getPemision(context,payload){
		// 	return new Promise((resolve,reject)=>{
		// 		axios.get('/api/pom.json').then((res)=>{
		// 			var dt = res.data.s
		// 			context.commit('setPermission',dt)
		// 			resolve(dt)
		// 			// console.log(dt)
		// 		}).catch((error)=>{
					
		// 		})
		// 	})
		// }
	},
	modules: {
	  
	}
})
