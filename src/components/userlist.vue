<template>
	<div id="userlist">
		<h1>用户管理</h1>
		<el-table stripe v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
		 element-loading-background="rgba(0, 0, 0, 0.8)" :data="tableData"
		 border style="width: 100%">
			<el-table-column prop="id" label="id" width="80">
			</el-table-column>
			<el-table-column prop="username" label="用户名" width="150">
			</el-table-column>
			<el-table-column prop="email" label="邮箱" width="250">
			</el-table-column>
			<el-table-column prop="phone" label="电话" width="200">
			</el-table-column>
			<el-table-column prop="createTime" label="注册时间">
				<template slot-scope="scope">
					<p>{{scope.row.createTime|istime}}</p>
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
		methods: {
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
				this.$axios.post('/manage/user/list.do', postData).then((res) => {
					if (res.data.status == 0) {
						this.tableData = res.data.data.list;
						this.total = res.data.data.total
						this.loading = false
					}
				});
			}
		},
		data() {
			return {
				currentPage1:1,
				tableData: [],
				pageSize: 10,
				total: 0,
				pageNum:1,
				loading: ''
			}
		},
		filters: {
			istime: function(value) {
				let istime = new Date(value)
				return istime.getFullYear() + '/' + (istime.getMonth() + 1) + '/' + istime.getDate() + '  ' +
					istime.getHours() + ':' + istime.getMinutes() + ':' + istime.getSeconds()

			}
		},
		created() {
			this.getData();
		},
	}
</script>

<style scoped="scoped" lang="less">
	h1 {
		font-size: 36px;
	}

	.el-table {
		margin-top: 20px;
	}

	.el-table-column {
		font-weight: 600;
	}

	.el-pagination {
		margin-top: 10px;
	}
</style>
