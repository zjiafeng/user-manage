<template>
	<div id="shopdetail">
		<h1>商品详情</h1>
		<p><span>商品名称</span>
			<el-input placeholder="商品名称" v-model="list.name" :disabled="true">
			</el-input>
		</p>
		<p><span>商品描述</span>
			<el-input placeholder="商品描述" v-model="list.subtitle" :disabled="true">
			</el-input>
		</p>
		<p><span>商品状态</span>
			<el-input placeholder="商品状态" v-model="list.status==1?'在售':'已下架'" :disabled="true">
			</el-input>
		</p>
		<p><span>所属分类</span>
			<el-select disabled v-model="value" placeholder="请选择一级品类" @change="sel()">
				<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
				</el-option>
			</el-select>
			<el-select disabled v-model="value2" placeholder="请选择二级品类" v-show="value!==''">
				<el-option v-for="item in options2" :key="item.id" :label="item.name" :value="item.id">
				</el-option>
			</el-select>
			<!-- <el-input v-model="list.subtitle" :disabled="true" style="width: 200px;">
			</el-input>
			<el-input v-model="list.subtitle" :disabled="true" style="width: 200px;">
			</el-input> -->
		</p>
		<p><span>商品价格</span>
			<el-input placeholder="请输入内容" v-model="list.price" type="number" :disabled="true">
				<template slot="append">元</template>
			</el-input>
		</p>
		<p><span>商品库存</span>
			<el-input placeholder="请输入内容" v-model="list.stock" type="number" :disabled="true">
				<template slot="append">件</template>
			</el-input>
		</p>
		<div style="display: flex;">
			<p style="margin-right: 0;"><span>商品图片</span>
				<div v-if="imgs.length!==0&&imgs.length!==null"  style="display: flex;">
					<img :src="'http://img.happymmall.com/'+item" alt="." v-for="(item,idx) in imgs" :key='idx' class="imgs">
				</div>
				<p v-else>
					<span>没有图片信息</span>
				</p>
			</p>
		</div>
		<div style="display: flex;">
			<p><span>商品详情</span>
				<span v-html="list.detail"></span>
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				imgs: [],
				options: [],
				value: '',
				options2: [],
				value2: '',
				input1: ''
			}
		},
		methods: {
			sel() {
				this.value2 = '';
				let postData = this.$qs.stringify({
					categoryId: this.value
				})
				console.log(postData)
				this.$axios.post('/manage/category/get_category.do', postData).then((res) => {
					this.options2 = res.data.data
				})
			},
			select() {
				this.$axios.post('/manage/category/get_category.do').then((res) => {
					// console.log(this.options)
					this.options = res.data.data
					this.value = this.list.parentCategoryId
				})
			},
			getData() {
				let postData = this.$qs.stringify({
					productId: this.$route.params.id
				})
				this.$axios.post('/manage/product/detail.do', postData).then((res) => {
					if (res.data.status == 0) {
						this.list = res.data.data
						if (res.data.data.subImages !== null) {
							this.imgs = res.data.data.subImages.split(",")
						}
						let postData = this.$qs.stringify({
							categoryId: this.list.parentCategoryId
						})
						this.$axios.post('/manage/category/get_category.do', postData).then((res) => {
							this.options2 = res.data.data
							this.value2 = this.list.categoryId
						})
					}
				})
			}
		},
		mounted() {
			this.getData();
			this.select();
		}
	}
</script>

<style scoped="scoped" lang="less">
	h1 {
		font-size: 34px;
		margin-bottom: 20px;
	}

	p {
		margin: 20px;
		height: 40px;
		line-height: 40px;

		span {
			font-size: 14px;
			margin: 0 20px;
			font-weight: 600;
			float: left;
		}

		.el-input {
			width: 400px;
		}
	}

	.imgs {
		display: inline-block;
		width: 80px;
		height: 80px;
		margin: 0 10px;
		border: 1px solid #ccc;
	}

	.el-select {
		width: 200px;
	}
</style>
