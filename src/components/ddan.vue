<template>
	<div id="ddan">
		<h1>订单管理</h1>
		<el-select v-model="options[0].value" class="input">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
			</el-option>
		</el-select>
		<el-input v-model="input" placeholder="订单号" class="input"></el-input>
		<el-button @click="sousuo()">查询</el-button>
		<el-table stripe v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
		 element-loading-background="rgba(0, 0, 0, 0.8)" :data="tableData"
		 border style="width: 100%">
			<el-table-column fixed prop="orderNo" label="订单号" width="200">
			</el-table-column>
			<el-table-column prop="receiverName" label="收件人" width="220">
			</el-table-column>
			<el-table-column prop="statusDesc" label="订单状态" width="120">
			</el-table-column>
			<el-table-column prop="shippingId" label="订单总价" width="120">
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" width="200">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
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
	export default {
		data() {
			return {
				input: '',
				options: [{
					value: '0',
					label: '按订单号查询'
				}],
				tableData: [],
				currentPage1:1,
				pageSize: 10,
				total: 0,
				pageNum:1,
				loading: ''
			}
		},
		created() {
			this.getData();
		},
		methods: {
			handleClick(row) {
				// console.log(row);
				this.$router.push({
					name: 'detail',
					params: {
						orderNo: row.orderNo
					}
				})
			},
			getData() {
				let postData = this.$qs.stringify({
					pageSize: this.pageSize,
					pageNum: this.pageNum,
				});
				this.loading = true;
				this.$axios.post('/manage/order/list.do', postData).then((res) => {
					if (res.data.status == 0) {
						this.tableData = res.data.data.list;
						this.total = res.data.data.total
						this.loading = false;
						this.tableData.forEach((item) => {
							item.shippingId = '￥' + item.shippingId
						})
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
			sousuo() {
				if (this.input == '') {
					this.getData();
					return
				} else {
					let postData = this.$qs.stringify({
						orderNo: this.input
					});
					this.$axios.post('/manage/order/search.do', postData).then((res) => {
						if (res.data.status == 0) {
							this.tableData = res.data.data.list;
							this.tableData.forEach((item) => {
								item.shippingId = '￥' + item.shippingId
							})
						} else {
							this.$message({
								message: '订单信息不存在！',
								type: 'warning'
							});
							return;
						}
					})
				}
			}
		},
	}
</script>

<style scoped="scoped" lang="less">
	h1 {
		font-size: 36px;
		margin-bottom: 10px;
	}

	.input {
		width: 200px;
		margin: 0 5px;
	}

	.el-table {
		margin-top: 10px;
	}

	.el-pagination {
		margin-top: 10px;
	}
</style>
