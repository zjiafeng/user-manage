<template>
	<div id="dlu">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>欢迎登录 - MMALL管理系统</span>
			</div>
			<el-input placeholder="请输入用户名称" clearable class="input" v-model="username"></el-input>
			<el-input placeholder="请输入用户密码" show-password class="input" v-model="password"></el-input>
			<el-button type="primary" class="btn" @click="dlu()">登录</el-button>
		</el-card>
	</div>
</template>

<script>
	export default {
		name: 'dlu',
		data() {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			dlu() {
				if (this.username == '') {
					this.$message({
						message: '用户名称不能为空',
						type: 'warning'
					});
					return
				} else if (this.password == '') {
					this.$message({
						message: '用户密码不能为空',
						type: 'warning'
					});
					return
				}
				let postData = this.$qs.stringify({
					username: this.username,
					password: this.password,
				});
				this.$axios({
					method: 'post',
					url: '/manage/user/login.do',
					data: postData
				}).then((res) => {
					console.log(res.data)
					if (res.data.status == 1) {
						this.$message({
							message: '用户名或密码错误！',
							type: 'warning'
						});
						return;
					}
					if (res.data.status == 0) {
						this.$store.commit('userinfoinit', res.data.data);
						this.$router.push({
							path: '/index'
						});
					}
				});
			}
		},
	}
</script>

<style lang="less" scoped="scoped">
	.btn {
		width: 440px;
	}

	.input {
		margin: 10px 0;
	}

	.box-card {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -60%);
	}

	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 480px;
	}
</style>
