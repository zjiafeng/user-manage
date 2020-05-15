<template>
	<div id="shouye">
		<h1>首页</h1>
		<el-row type="flex" class="row-bg" justify="space-around" :gutter="20">
			<el-col :span="8">
				<div class="grid-content bg-purple" @mouseenter="hua($event)" @mouseleave="hua1($event)">
					<h2>{{user}}</h2>
					<p><i class="el-icon-user-solid"></i>用户总数</p>
				</div>
			</el-col>
			<el-col :span="8">
				<div class="grid-content bg-purple-light" @mouseenter="hua2($event)" @mouseleave="hua3($event)">
					<h2>{{product}}</h2>
					<p><i class="el-icon-s-operation"></i>商品总数</p>
				</div>
			</el-col>
			<el-col :span="8">
				<div class="grid-content bg-purple-light1" @mouseenter="hua4($event)" @mouseleave="hua5($event)">
					<h2>{{order}}</h2>
					<p><i class="el-icon-s-order"></i>订单总数</p>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				user: '',
				product:'',
				order:''
			}
		},
		created() {
			this.$axios.post('/manage/statistic/base_count.do').then((res) => {
				// console.log(res.data)
				this.user=res.data.data.userCount,
				this.product=res.data.data.productCount,
				this.order=res.data.data.orderCount
			})
		},
		methods: {
			hua($event) {
				$event.currentTarget.className = "red"
			},
			hua1($event1) {
				$event1.currentTarget.className = "red1"
			},
			hua2($event) {
				$event.currentTarget.className = "red2"
			},
			hua3($event1) {
				$event1.currentTarget.className = "red3"
			},
			hua4($event) {
				$event.currentTarget.className = "red4"
			},
			hua5($event1) {
				$event1.currentTarget.className = "red5"
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	h1 {
		font-size: 36px;
	}

	.el-row {
		margin-top: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col i {
		padding-right: 5px;
	}

	.el-col {
		border-radius: 4px;
		text-align: center;
	}

	.el-col h2 {
		color: #fff;
		font-size: 50px;
		padding: 10%;
	}

	.el-col p {
		font-size: 20px;
		color: #fff;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}

	.bg-purple {
		background: #f0b45f;
		height: 160px;
	}

	.bg-purple-light {
		background: #6bbe6b;
		height: 160px;
	}

	.bg-purple-light1 {
		background: #5db8d3;
		height: 160px;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.row-bg {
		padding: 10px 0;

	}

	.red {
		transition: all 500ms;
		transform: scale(1.1, 1.1);
		background: #f0b45f;
		height: 160px;

		>h2 {
			color: #000;
		}

		>p {
			color: #000;
		}

		border-radius: 4px;
	}

	.red1 {
		transition: all 500ms;
		transform: scale(1, 1);
		background: #f0b45f;
		color: #000;
		height: 160px;
		border-radius: 4px;
	}

	.red2 {
		transition: all 500ms;
		transform: scale(1.1, 1.1);
		background: #6bbe6b;
		height: 160px;

		>h2 {
			color: #000;
		}

		>p {
			color: #000;
		}

		border-radius: 4px;
	}

	.red3 {
		transition: all 500ms;
		transform: scale(1, 1);
		background: #6bbe6b;
		color: #000;
		height: 160px;
		border-radius: 4px;
	}

	.red4 {
		transition: all 500ms;
		transform: scale(1.1, 1.1);
		background: #5db8d3;
		height: 160px;

		>h2 {
			color: #000;
		}

		>p {
			color: #000;
		}

		border-radius: 4px;
	}

	.red5 {
		transition: all 500ms;
		transform: scale(1, 1);
		background: #5db8d3;
		color: #000;
		height: 160px;
		border-radius: 4px;
	}
</style>
