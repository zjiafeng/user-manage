<template>
	<div class="type">
		<div class="top">
			<h1>品类管理</h1>
			<el-button type="primary" @click="()=>{this.$router.push({path:'/index/addpinlei'})}"><i class="el-icon-plus"></i> 添加品类</el-button>
		</div>
		<p>当前商品id：0</p>
		<el-table stripe v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
		 element-loading-background="rgba(0, 0, 0, 0.8)" :data="tableData2"
		 border style="width: 100%">
			<el-table-column fixed prop="id" label="品类ID" width="150">
			</el-table-column>
			<el-table-column prop="name" label="品类名称" width="500">
			</el-table-column>
			<el-table-column fixed="right" label="操作">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small">修改名称</el-button>
					<el-button type="text" size="small" @click="btn(scope.row)">查看其子品类</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="block">
			<el-col :span="24" class="toolbar pageBar">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
				 :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout=" prev, pager, next, sizes, total,jumper" :total="total" background>
				</el-pagination>
			</el-col>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
		name: 'type',
		data() {
			return {
				tableData: [],
				tableData2: [],
				total: 0,
				loading: '',
				pageSize: 10,
				pageNum:1,
			}
		},
		methods: {
			handleClick(item) {
				// console.log(item)
				let postData = this.$qs.stringify({
					categoryId: item.id,
					categoryName: item.name
				})
				this.$prompt('请输入新的品类名称', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputValue:item.name
				}).then(({
					value
				}) => {
					this.$axios.post('/manage/category/set_category_name.do', postData).then((res) => {
						this.$message({
							type: 'success',
							message: res.data.data
						});
						Vue.nextTick(()=>{
							item.name=value
							let postData = this.$qs.stringify({
								categoryId: item.id,
								categoryName: item.name
							})
							this.$axios.post('/manage/category/set_category_name.do', postData).then((res) => {})
						})
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消输入'
					});
				});
			},
			getData(){
				let pdata = this.$qs.stringify({
					categoryId: '0',
				});
				this.loading=true;
				this.$axios.post('/manage/category/get_category.do', pdata).then((res) => {
					if (res.data.status == 0) {
						// console.log(res.data.data.length);
						this.total=res.data.data.length
						this.tableData = res.data.data
						this.tableData2=this.tableData.slice((this.pageNum-1)*this.pageSize,this.pageNum*this.pageSize)
						this.loading = false;
					}
				});
			},
			btn(i){
				this.$router.push({
					name:'ispinlei',
					params:{id:i.id}
				})
			},
			//改变时
			handleSizeChange(val) {
			    this.pageSize = val;
			    this.getData();
			},
			//条目改变时
			handleCurrentChange(val) {
			    this.pageNum = val;
			    this.getData();
			},
		},
		created() {
			this.getData();
		},
	}
</script>

<style lang="less" scoped>
	h1 {
		font-size: 36px !important;
	}

	.top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}

	p {
		margin: 10px 0;
	}
	.block{
		margin-top: 10px;
	}
</style>
