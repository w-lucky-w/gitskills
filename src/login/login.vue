<template>
	<div class="login">
		<div class="cent">
			<el-form :model="ruleForm" status-icon :rules="rules2" ref="ruleForm" label-width="90px" class="demo-ruleForm">
				<el-form-item label="用户:" prop="name">
					<el-input v-model="ruleForm.name" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item label="密码:" prop="pass">
					<el-input type="password" v-model="ruleForm.pass" auto-complete="off" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm()">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		name:"login",
	    data() {
		  return {
			ruleForm: {
				pass: '',
				name: ''
			},
			rules2: {
			  name: [
			      { required: true, message: '请输入用户名', trigger: 'blur' }
			  ],
			  pass: [
			  	{ required: true, message: '请输入密码', trigger: 'blur' }
			  ],
			}
		  };
		},
		methods: {
			submitForm() {
				
				this.$refs.ruleForm.validate((valid) => {
					if (valid) {
						console.log(valid)
						this.$axios.get("/api/user.json").then((res)=>{
							console.log(res)
							let data = res.data.data;
							//find  发现
							let rs = data.find((u) => u.name == this.ruleForm.name && u.pass == this.ruleForm.pass)
							if(rs){
								
								this.$store.commit('setUser',rs)//同步存数据
								console.log(rs)
								//传对象要转成字符串
								console.log(JSON.stringify(rs))
								sessionStorage.setItem('curruser',JSON.stringify(rs))
								this.$router.push('/homea')
								// this.$router.push('/home')
								
								//发送请求,
								// this.$axios.get('/api/pom.json').then((p)=>{
								// 	let per = p.data.data[rs.role]
								// 	//把存入vuex
								// 	this.$store.commit('setPer',per)
									
									// 本地存储
									// sessionStorage 关闭浏览器,将自动清除
									// localStorage 没有失效时间,即使浏览器关闭,依然存在,除非手动移出
									// //请求权限菜单
									// this.$store.dispatch('getPemision',rs.role)//异步存数据
									
								// })
								
							}else{
								this.$message.error("用户名或密码错误")
							}
							
								// 		//保存用户信息
										
								// 		//本地存储
								// 		//vuex中的是数据，浏览器刷新属性会消失，而lacalStorage不会
								// 		//vuex中的数据会及时刷新，lacalStorage而不会
										
								// 		this.$store.commit('setUser',u.user)//同步存数据
								// 		// console.log(u.user)
								// 		this.$router.push('/homea')
								// 		// this.$router.push('/home')
								// 		//请求权限菜单
								// 		this.$store.dispatch('getPemision',u.role)//异步存数据
								// 		return;
								// 	}
								
						}).catch((error)=>{
							
						})
					} 
					else {
						console.log('error submit!!');
						return false;
					}
				});
			
			}
		}
	}
</script>

<style>
	.cent{
		margin: 0 auto;
		margin-top: 47px;
		width: 1200px;
		height: 600px;
		background: url(../img/login.jpg) center/cover;
	}
	.demo-ruleForm{
		float: right;
		border: 1px solid #cfcece;
		margin-top: 130px;
		margin-right: 48px;
		width: 330px;
		height: 240px;
		box-sizing: border-box;
		padding-right: 40px;
		padding-top:40px;
		background-color: #fff;
		border-radius: 10px;
	}
	
	.el-form-item__content {
	    font-size: 18px;
		margin-right: 10px;
	}
	.login{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;/* 如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。 */
		background-color: #f1f1f1;
	}
</style>
