<template>
	<div class="teacher">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/homea' }">系统管理</el-breadcrumb-item>
			<el-breadcrumb-item>教师管理系统</el-breadcrumb-item>
		</el-breadcrumb>
		
		<div class="query">
			<el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
			  <el-form-item label="姓名">
			    <el-input v-model="formInline.name" placeholder="姓名:"></el-input>
			  </el-form-item>
			  <el-form-item label="性别">
			    <el-select v-model="formInline.sex">
					<el-option label="请选择" value=""></el-option>
					<el-option label="男" value="男"></el-option>
					<el-option label="女" value="女"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="onSubmit">查询</el-button>
				<el-button type="primary" @click="onAdd">添加</el-button>
			  </el-form-item>
			</el-form>
		</div>
		
		<div class="table">
			<el-table 
				:data = "tableData" 
				border 
				stripe
				style="width: 100%">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="name" label="姓名">
				</el-table-column>
				<el-table-column prop="sex" label="性别" :formatter = "handSex">
				</el-table-column>
				<el-table-column prop="birthday" label="生日" :formatter = "handData">
				</el-table-column>
				<el-table-column prop="zzmm" label="政治面貌">
				</el-table-column>
				<el-table-column prop="education" label="学历">
				</el-table-column>
				<el-table-column prop="degree" label="学位">
				</el-table-column>
				<el-table-column prop="graduation" label="毕业大学">
				</el-table-column>
				<el-table-column prop="direction" label="研究方向">
				</el-table-column>
				<el-table-column prop="photo" label="照片">
				</el-table-column>
				<el-table-column label="操作" width="180">
					<template slot-scope="scope">
						<el-button size="mini"  @click="handleSearch(scope.row)" icon="el-icon-search" circle></el-button>
						<el-button size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
						<el-button size="mini" icon="el-icon-delete" circle type="danger" @click="handleDelete(scope.row.id)"></el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		
		<el-dialog
			title="添加"
			:visible.sync="dialogVisible"
			width="30%">
			<el-form :model="form">
			    <el-form-item label="姓名" :label-width="formLabelWidth">
			    	<el-input v-model="form.name" autocomplete="off" placeholder="姓名"></el-input>
			    </el-form-item>
			    <el-form-item label="性别" :label-width="formLabelWidth">
			    	<el-radio v-model="form.sex" label="男">男</el-radio>
			    	<el-radio v-model="form.sex" label="女">女</el-radio>
			    </el-form-item>
			    <el-form-item label="出生年月" :label-width="formLabelWidth">
			    	<el-date-picker
			    		v-model="form.birthday"
			    		type="date"
			    		placeholder="选择日期"
			    		value-format="yyyy-MM-dd">
			    	</el-date-picker>
			    </el-form-item>
			    <el-form-item label="政治面貌" :label-width="formLabelWidth">
			    	<el-select v-model="form.zzmm" placeholder="请选择">
			    	    <el-option
			    	      v-for="item in mm"
			    	      :key="item"
			    	      :label="item"
			    	      :value="item">
			    	    </el-option>
			    	</el-select>
			    </el-form-item>
			    <el-form-item label="学历" :label-width="formLabelWidth">
			    	<el-select v-model="form.education" placeholder="请选择学历">
			    	    <el-option
			    			v-for="item in edu"
			    			:key="item"
			    			:label="item"
			    			:value="item">
			    	    </el-option>
			    	</el-select>
			    </el-form-item>
			    <el-form-item label="学位" :label-width="formLabelWidth">
			    	<el-select v-model="form.degree" placeholder="请选择学历">
			    		<el-option
			    		  v-for="item in deg"
			    		  :key="item"
			    		  :label="item"
			    		  :value="item">
			    		</el-option>
			    	</el-select>
			    </el-form-item>
			    <el-form-item label="职称" :label-width="formLabelWidth">
			    	<el-input v-model="form.title" autocomplete="off" placeholder="职称"></el-input>
			    </el-form-item>
			    <el-form-item label="毕业学校" :label-width="formLabelWidth">
			    	<el-input v-model="form.graduation" autocomplete="off" placeholder="毕业学校"></el-input>
			    </el-form-item>
				<el-form-item label="研究方向" :label-width="formLabelWidth">
					<el-input v-model="form.direction" autocomplete="off" placeholder="研究方向"></el-input>
				</el-form-item>
			  </el-form>
			<span slot="footer" class="dialog-footer">			
			<el-button type="primary" @click="dialogVisible = false">取消</el-button>
			<el-button type="primary" @click="dialogadd">确 定</el-button>
		  </span>
		</el-dialog>
			
		<!-- <el-dialog
			title="信息"
			:visible.sync="dialogVisible"
			width="30%">
			<div class="data">
				<label>姓名：</label>
				<span>{{teacherlist.name}}</span>
			</div>
			<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog> -->

	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				mm: [],
				edu: [],
				deg: [],
				dialogVisible: false,
				teacherlist:{},
				formInline: {
					name: '',
					sex: ''
				},
				form: {
					id:'',
					name: '',
					sex: '',
					birthday: '',
					zzmm: '',
					education:'',
					degree:'',
					title:'',
					graduation:''
					
				},
				formLabelWidth: '120px',
			}
		},
		mounted() {
			this.getlist()
		},
		methods: {
			getlist() {
				this.$axios.get('/api/teacher.json').then((res) => {
					// console.log(res)
					let re = res.data.data
					this.tableData = re.dt
					this.mm = re.mm
					this.edu = re.edu
					this.deg = re.deg
				})
			},
			handleSearch(row){
				this.teacherlist = row
				// this.teacherlist = {...row}
				this.dialogVisible = true
			},
			 onSubmit() {
				console.log('submit!');
			},
			onAdd(){
				this.dialogVisible = true
				for(let i in this.form){
					this.form[i] = ''
				}
			},
			dialogadd(){
				let obj = Object.assign({},this.form)
				this.tableData.push(obj)
				
				this.dialogVisible = false
			},
			handleEdit(index, row) {
				console.log(index);
				console.log(row)
			},
			handleDelete(row) {
				this.$confirm('确定要删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					console.log(row)
					var idx = this.tableData.findIndex((item,i) => {
						console.log(item.id)
						return item.id == row
					})
					console.log(idx.id)
					this.tableData.splice(idx,1)
					this.$message({
						type: 'success',
						message: '删除成功!'
					})
				}).catch(() => {})
				
			}
			//格式化
			,handData(row, column, cellValue, index){
				// console.log(row)
				if(!cellValue) return ''
				let dt = new Date(cellValue)
				let year = dt.getFullYear()
				let month = dt.getMonth()+1 < 10 ? '0'+( dt.getMonth()+1) : dt.getMonth()+1
				let day = dt.getDate() < 10 ? '0' + (dt.getDate()) : dt.getDate()
				return year + '-' + month +'-'+day
			}
			,handSex(row, column, cellValue, index){
				// console.log(cellValue)
				return cellValue == 1 ? '男' : '女'
			}
		},
		
	}
</script>

<style>
	.query{
		margin-top: 20px;
	}
	.table {
		/* padding-top: 10px; */
	}
</style>
