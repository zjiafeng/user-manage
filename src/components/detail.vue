<template>
	<div id="dxq">
		<h1>订单详情</h1>
		<div class="li"><span>订单号：</span>
			<el-input placeholder="请输入内容" v-model="list.orderNo" :disabled="true"></el-input>
		</div>
		<div class="li"><span>创建时间：</span>
			<el-input placeholder="请输入内容" v-model="list.createTime" :disabled="true"></el-input>
		</div>
		<div class="li"><span>收件人：</span>
			<el-input placeholder="请输入内容" v-model="list.receiverName" :disabled="true"></el-input>
		</div>
		<div class="li"><span>订单状态：</span>
			<el-input placeholder="请输入内容" v-model="list.statusDesc" :disabled="true"></el-input>
		</div>
		<div class="li"><span>支付方式：</span>
			<el-input placeholder="请输入内容" v-model="list.paymentTypeDesc" :disabled="true"></el-input>
		</div>
		<div class="li"><span>订单金额：</span>
			<el-input placeholder="请输入内容" v-model="list.payment" :disabled="true"></el-input>
		</div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column label="商品图片" width="250" prop="productImage">
				<template slot-scope="scope">
					<img :src="'http://img.happymmall.com/'+scope.row.productImage" alt="">
				</template>
			</el-table-column>
			<el-table-column prop="productName" label="商品信息" width="250">
			</el-table-column>
			<el-table-column prop="currentUnitPrice" label="单价" width="150">
			</el-table-column>
			<el-table-column prop="quantity" label="数量" width="150">
			</el-table-column>
			<el-table-column prop="totalPrice" label="合计">
			</el-table-column>
		</el-table>
	</div>
</template>
<!-- 'http://img.happymmall.com/'+img -->
<script>
	export default {
		data() {
			return {
				list: [],
				tableData: [],
			}
		},
		methods: {
			getData() {
				let postData = this.$qs.stringify({
					orderNo:this.$route.params.orderNo
				});
				this.$axios.post('/manage/order/detail.do',postData).then((res)=>{
					console.log(res)
					this.list =res.data.data
					this.tableData=res.data.data.orderItemVoList
					// this.img=this.tableData.productImage;
				})
			}
		},
		mounted(){
			this.getData()
		}
	}
</script>

<style scoped="scoped" lang="less">
	h1 {
		font-size: 36px;
		margin-bottom: 20px;
	}
	img{
		width: 80px;
		height: 80px;
	}
	.el-input {
		width: 400px;
		color: #000;
	}

	.li {
		margin-top: 10px;

		span {
			display: inline-block;
			width: 100px;
			text-align: right;
		}
	}

	.el-table {
		margin-top: 20px;
	}
</style>
