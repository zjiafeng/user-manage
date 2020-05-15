<template>
	<div id="shop">
		<div class="top">
			<h1>商品管理</h1>
			<el-button type="primary" @click="()=>{this.$router.push({path:'/index/shop/addshop'})}"><i class="el-icon-plus"></i> 添加商品</el-button>
		</div>
		<el-select v-model="options.value" class="input">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
			</el-option>
		</el-select>
		<el-input v-model="input" placeholder="关键词" class="input"></el-input>
		<el-button @click="ssuo">查询</el-button>
		<el-table stripe v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
		 element-loading-background="rgba(0, 0, 0, 0.8)"  :data="tableData" border style="width: 100%">
			<el-table-column prop="id" label="id" width="150">
			</el-table-column>
			<el-table-column label="信息" width="350">
				<template slot-scope="scope">
					<p>{{scope.row.name}}</p>
					<p>{{scope.row.subtitle}}</p>
				</template>
			</el-table-column>
			<el-table-column prop="price" label="价格" width="200">
			</el-table-column>
			<el-table-column prop="status" label="状态" width="150">
				<template slot-scope="scope">
					<p><span>{{scope.row.status|isstatus}}</span>
						<button @click="btn(scope.row)" class="btn">{{scope.row.status==1?'下架':scope.row.status==2?'上架':'未知'}}</button></p>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button @click="handleclick(scope.$index,scope.row)" type="text" size="small">查看</el-button>
					<el-button type="text" size="small" @click="handleedit(scope.$index, scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="block">
			<el-col :span="24" class="toolbar pageBar">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage1"
				 :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout=" prev, pager, next, sizes, total,jumper" :total="total" background>
				</el-pagination>
			</el-col>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
		data() {
			return {
				input: '',
				options: [{
					value: '0',
					label: '按商品id搜索'
				}, {
					value: '1',
					label: '按商品名称搜索'
				}],
				currentPage1:1,
				pageSize: 10,
				total: 0,
				pageNum:1,
				loading: '',
				tableData: [],
			}
		},
		filters: {
			isstatus: function(value) {
				if (value == 1) {
					return '在售'
				} else if (value == 2) {
					return '已下架'
				}
			}
		},
		methods: {
			btn(i) {
				// console.log(i);
				let postData = this.$qs.stringify({
					productId: i.id,
					status: i.status
				});
				if (i.status === 1) {
					this.$confirm('确认要下架该商品吗？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$axios.post('/manage/product/set_sale_status.do', postData).then((res) => {
							this.$message({
								type: 'success',
								message: res.data.data
							});
							
							Vue.nextTick(()=>{
								i.status=2;
								let postData = this.$qs.stringify({
									productId: i.id,
									status: i.status
								});
								this.$axios.post('/manage/product/set_sale_status.do', postData).then((res) =>{})
							})
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消操作'
						});
					});
				} else if (i.status === 2) {
					this.$confirm('确认要上架该商品吗？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$axios.post('/manage/product/set_sale_status.do', postData).then((res) => {
							this.$message({
								type: 'success',
								message: res.data.data
							});
							Vue.nextTick(()=>{
								i.status=1;
								let postData = this.$qs.stringify({
									productId: i.id,
									status: i.status
								});
								this.$axios.post('/manage/product/set_sale_status.do', postData).then((res) =>{})
							})
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消操作'
						});
					});
				}

			},
			ssuo() {
				
				if (this.input == '') {
					this.getData();
					return
				}
				if (this.options.value == 0) {
					
					let postData = this.$qs.stringify({
						productId: this.input
					})
					this.$axios.post('/manage/product/search.do', postData).then((res) => {
						if (res.data.status == 0) {
							this.tableData = res.data.data.list;
						}
					})
					return
				} else if (this.options.value == 1) {
					let postData = this.$qs.stringify({
						productName: this.input
					})
					this.$axios.post('/manage/product/search.do', postData).then((res) => {
						if (res.data.status == 0) {
							this.tableData = res.data.data.list;
						}
					})
					return
				}
			},
			current_change(currentPage) {
				this.currentPage = currentPage
			},
			handleclick(a, b) {
				this.$router.push({
					name: 'shopdetail',
					params: {
						id: b.id
					}
				})
			},
			handleedit(a,b) {
				this.$router.push({
					name: 'addshop',
					params: {
						id: b.id
					}
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
			getData() {
				let postData = this.$qs.stringify({
					pageSize: this.pageSize,
					pageNum: this.pageNum,
				});
				this.loading = true;
				this.$axios.post('/manage/product/list.do',postData).then(res => {
					this.tableData = res.data.data.list;
					this.total = res.data.data.total
					this.loading = false;
					// console.log(this.tableData)
				})
			}
		},
		created() {
			this.getData();
		}
	}
</script>

<style scoped="scoped" lang="less">
	.el-table {
		margin-top: 10px;
	}

	.el-pagination {
		margin-top: 10px;
	}

	.input {
		width: 200px;
		margin: 0 5px;
	}

	h1 {
		font-size: 36px !important;
	}

	.top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}

	.el-icon-plus {
		font-weight: 800;
	}

	.btn {
		border: none;
		border-radius: 10%;
		height: 24px;
		text-align: center;
		line-height: 24px;
		margin: 0 10px;
		color: #fff;
		background-color: #E6A23C;
		cursor: pointer;
		outline: none;
	}
</style>
