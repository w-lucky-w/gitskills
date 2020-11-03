<template>
	<div class="user">
		<div style="padding:20px">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<!-- <el-form-item label="用户名">
					<el-input v-model="formInline.user" placeholder="用户名"></el-input>
				</el-form-item> -->
				<el-form-item label="角色">
					<el-select v-model="formInline.role" placeholder="角色">
						<el-option label="全部" value=""></el-option>
						<el-option label="管理员" value="1"></el-option>
						<el-option label="用户" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" class="el-icon-search" @click="defaults()"> 查询</el-button>
					<el-button type="primary" class="el-icon-circle-plus-outline" @click="handleClick(null,'add')"> 增加</el-button>
				</el-form-item>
			</el-form>
			<el-table
				:data="tableData.slice((currentPage - 1) * pageSize, currentPage*pageSize)"
				border
				highlight-current-row
				@selection-change="handleSelectionChange"
				style="width: 100%;">
				<el-table-column
					type="selection"
					width="60">
				</el-table-column>
				<el-table-column
					type="index"
					label="序号"
					width="60">
				</el-table-column>
				<el-table-column
					prop="name"
					label="账号"
					width="185">
				</el-table-column>
				<el-table-column
					prop="user"
					label="用户名"
					width="185">
				</el-table-column>
				<el-table-column
					prop="pass"
					label="密码"
					width="185">
				</el-table-column>
				<el-table-column
					prop="role"
					label="身份"
					width="185">
				</el-table-column>
				<el-table-column
					fixed="right"
					label="操作">
					<template slot-scope="scope"> 
						<el-button @click="handleClick(scope.row,'edit')" type="primary" icon="el-icon-edit" circle>编辑</el-button>
						<el-button @click="handleDelete(scope.row)" type="danger" icon="el-icon-delete" circle>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				background
			  @size-change="handleSizeChange"
			  @current-change="handleCurrentChange"
			  :current-page="currentPage"
			  :page-size="pageSize"
			  layout="total, prev, pager, next, jumper"
			  :total="tableData.length"
			  style="margin-top:20px">
			</el-pagination>
			
			<el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
				<el-form :model="form" :disabled="isDisable">
					<el-form-item label="账号" :label-width="formLabelWidth">
						<el-input v-model="form.name" autocomplete="off" placeholder="账号"></el-input>
					</el-form-item>
					<el-form-item label="用户名" :label-width="formLabelWidth">
						<el-input v-model="form.user" autocomplete="off" placeholder="用户名"></el-input>
					</el-form-item>
					<el-form-item label="密码" :label-width="formLabelWidth">
						<el-input v-model="form.pass" autocomplete="off" placeholder="密码"></el-input>
					</el-form-item>
					<el-form-item label="角色" :label-width="formLabelWidth">
						<el-select v-model="form.role" placeholder="角色">
							<el-option label="管理员" value="1"></el-option>
							<el-option label="用户" value="2"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary"@click="handleSave">确 定</el-button>
				</div>
		  </el-dialog>
		</div>
	</div>

</template>

<script>
	export default{
		name:"user",
		methods: {  //点击事件
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.pageSize=val
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.currentPage=val
			},
			handleSelectionChange(val) {
			  this.multipleSelection = val;
			},
			handleClick(row,ope) {
				console.log(row);
				this.operate = ope
				switch (ope) {
					case 'add':
						this.dialogTitle = '新增'
						this.isDisable = false
						this.emptyEditForm()
						break
					case 'edit':
						this.dialogTitle = '编辑'
						this.isDisable = false
						this.form = Object.assign({},row)
						break
				}
				this.dialogFormVisible = true
			},
			onSubmit() {
				console.log('submit!');
			},
			handleSave() {
				switch (this.operate) {
					case 'add':
						// 此处调用后台接口的操作省略。。。。。。。
					
						// 取id的最大值
						var val = 0
						if (this.tableData.length) {
							val = Math.max.apply(Math,this.tableData.map(item => { return item.id }))
						}
						//赋值给editForm
						this.form.id = val+1
						// 把数据添加到tabledata
						var obj = Object.assign({},this.form)
						this.tableData.push(obj)
						// 清空editform
						this.emptyEditForm()
						break
					case 'edit':
						// 此处调用后台接口的操作省略。。。。。。。
					
						this.tableData.forEach((item) => {
							console.log(item)
							if (item.id == this.form.id) {
								item.name = this.form.name
								item.user = this.form.user
								item.pass = this.form.pass
								item.role = this.form.role
							}
						})
						break
				}
				// 关闭dialog
				this.dialogFormVisible = false
			},
			handleDelete(row) {
				this.$confirm('确定要删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					
					// 此处调用后台接口的操作省略。。。。。。。
					
					// 数组中查找要删除的行索引
					var idx = this.tableData.findIndex((item,i) => {
						console.log(item)
						console.log(i )
						return item.id == row.id
					})
					// console.log(idx)
					// console.log(this.tableData.splice(idx,1))
					this.tableData.splice(idx,1)                                 
					this.$message({
						type: 'success',
						message: '删除成功!'
					})
				}).catch(() => {})
			},
			emptyEditForm() {
				for (let key in this.form) {
					this.form[key] = ''
				}
			}
		}, 
	
		data() {
			return {
				currentPage: 1,
				pageSize: 7,
				tableData: [],
				multipleSelection: [],
				formInline: {
				  user: '',
				  role: ''
				},
				dialogTableVisible: false,
				dialogFormVisible: false,
				dialogTitle:'',				
				operate: '', //标识：新增、查看、编辑
				isDisable: false,
				form: {
					id:'',
					name: '',
					user: '',
					pass: '',
					role: ''
				},
				formLabelWidth: '120px'
			}
		},
		mounted() {   //初始化，向后端发起请求
		
			this.$axios.get('/api/user.json').then((res) => {
				  // for( let i = 0 ; i<res.data.data.length; i++){
					 //  	// console.log( res.data.data[i].role)
					 //  if( res.data.data[i].role==1){
					 //  	res.data.data.role = "管理员"
						// this.tableData = res.data.data
					 //  }
					 //  if( res.data.data[i].role==2){
					 //  	res.data.data.role = "用户"
					 //  	this.tableData = res.data.data
					 //  	console.log(this.tableData.role)
					 //  	console.log(res.data.data.role)
					 //  }
				  // }
				  this.tableData = res.data.data
					console.log(this.tableData )
					console.log(this.tableData.length )
					console.log(this.tableData[1].count )
					console.log(res.data)
					console.log(res)
			})
		},
	}
</script>

<style>
	.el-table .cell {
	    text-align: center;
	}
</style>
