<template>
	<div id="sye">
		<el-container>
			<el-header>
				<div class="left">
					<p><span>HAPPY</span>MMALL</p>
				</div>
				<div></div>
				<div class="right">
					<el-dropdown size="medium" split-button type="primary">
						<i class="el-icon-user-solid"></i> 欢迎，{{username}}！
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item><span @click="tdlu()"><i class="el-icon-s-unfold"></i>退出登录！</span></el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</el-header>
			<el-container style="margin-top: 60px;">
				<el-aside width="300px">
					
						<el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
						 active-text-color="#ffd04b">
							 <el-menu-item index="1" @click="()=>{this.$router.push('/index/shouye')}">
								<i class="el-icon-s-data"></i>
								<span slot="title">首页</span>
							 </el-menu-item>
							<el-submenu index="1">
								<template slot="title">
									<i class="el-icon-s-operation"></i>
									<span>商品</span>
								</template>
									<el-menu-item index="1-1" @click="()=>{this.$router.push('/index/shop')}">商品管理</el-menu-item>
									<el-menu-item index="1-2" @click="()=>{this.$router.push('/index/pinlei')}">品类管理</el-menu-item>
							</el-submenu>
							<el-submenu index="2">
								<template slot="title">
									<i class="el-icon-s-order"></i>
									<span>订单</span>
								</template>
								
									<el-menu-item index="2-1" @click="()=>{this.$router.push('/index/ddan')}">订单管理</el-menu-item>
								
							</el-submenu>
							<el-submenu index="3">
								<template slot="title">
									<i class="el-icon-user-solid"></i>
									<span>用户</span>
								</template>
									<el-menu-item index="3-1" @click="()=>{this.$router.push('/index/userlist')}">用户列表</el-menu-item>
							</el-submenu>
						</el-menu>
					
					
				</el-aside>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>

	</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		computed: {
			...mapState(['username'])
		},
		created(){
			this.$message({
				message: '欢迎回来！',
				type: 'success'
			});
		},
		methods:{
			tdlu(){
				this.$router.push({
					path:'/dlu'
				});
				sessionStorage.clear();
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.el-menu-item{
		width: 300px;
	}
	.el-submenu{
		border-top: 1px solid #333;
		width: 300px;
	}
	.el-container {
		height: 100vh;
	}

	.el-header {
		// margin: 0;
		padding: 0;
		// background-color: rgb(255, 255, 255);
		color: #333;
		display: flex;
		line-height: 60px;
		position: fixed;
		height: 60px;
		width: 100%;
		justify-content: space-between;
		box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
		border-radius: 5px;
		
		.left {
			width: 300px;
			background-color: rgb(50, 50, 58);

			p {
				font-size: 26px;
				font-weight: 600;
				color: #fff;

				span {
					color: #409EFF;
					margin: 0 30px;
				}
			}
		}

		.right {
			margin: 0 30px;
			
		}
	}

	.el-aside {
		background-color: rgb(43, 46, 51);
		color: #333;
		
	}

	.el-main {
		background-color: #E9EEF3;
		color: #333;
		padding: 30px;
	}
</style>
