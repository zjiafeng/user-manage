<template>
	<div id="addpinlei">
		<h1>品类管理 -- 添加品类</h1>
		<p><span>所属品类</span>
			<el-select v-model="value" placeholder="/所有" @change="sel()">
				<el-option label="/所有" value="0"></el-option>
				<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
				</el-option>
			</el-select>
		</p>
		<p><span>品类名称</span>
			<el-input placeholder="请输入品类名称" v-model="input" clearable></el-input>
		</p>
		<p><span></span>
			<el-button type="primary" @click="add()">提交</el-button>
		</p>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				options: [],
				value: '',
				input: ''
			}
		},
		methods: {
			sel() {
				console.log(this.value)
			},
			add() {
				let postData = this.$qs.stringify({
					categoryName: this.input,
					parentId: this.value
				})
				if (this.input !== '') {
					this.$axios.post('/manage/category/add_category.do', postData).then((res) => {
						this.$alert(res.data.data, '提示', {
							confirmButtonText: '确定',
							callback: action => {
								this.$router.push({
									path: '/index/pinlei'
								})
							}
						});
						
					})
				} else {
					this.$message({
						message: '请输入品类名称',
						type: 'warning'
					});
				}
			},
			select() {
				this.$axios.post('/manage/category/get_category.do').then((res) => {
					// console.log(this.options)
					res.data.data.forEach((item, idx) => {
						item.name = '/所有/' + item.name
					})
					this.options = res.data.data
				})
			},
		},
		mounted() {
			this.select();

		}

	}
</script>

<style scoped="scoped" lang="less">
	h1 {
		font-size: 36px !important;
		margin-bottom: 50px;
	}

	p {
		margin: 30px;

		span {
			font-weight: 600;
			margin: 0 30px;
			width: 64px;
			height: 21px;
			display: inline-block;
		}
	}

	.el-input {
		width: 300px;
	}
</style>
