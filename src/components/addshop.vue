<template>
	<div id="addshop">
		<h1>{{msg}}</h1>
		<p><span>商品名称</span>
			<el-input placeholder="商品名称" v-model="list.name" clearable>
			</el-input>
		</p>
		<p><span>商品描述</span>
			<el-input placeholder="商品描述" v-model="list.subtitle" clearable>
			</el-input>
		</p>
		<p><span>所属分类</span>
			<el-select v-model="value" placeholder="请选择一级品类" @change="sel()">
				<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
				</el-option>
			</el-select>
			<el-select v-model="value2" placeholder="请选择二级品类" v-show="value!==''">
				<el-option v-for="item in options2" :key="item.id" :label="item.name" :value="item.id">
				</el-option>
			</el-select>
		</p>
		<p><span>商品价格</span>
			<el-input placeholder="请输入内容" v-model="list.price" type="number">
				<template slot="append">元</template>
			</el-input>
		</p>
		<p><span>商品库存</span>
			<el-input placeholder="请输入内容" v-model="list.stock" type="number">
				<template slot="append">件</template>
			</el-input>
		</p>
		<div style="display: flex;">
			<p style="margin-right: 0;"><span>商品图片</span>
				<div v-if="imgs.length!==0">
					<div v-for="(item,idx) in imgs" :key='idx' @click="del(idx)" class="delimg">
						<img :src="'http://img.happymmall.com/'+item" alt="" class="imgs">
						<i class="el-icon-delete"></i>
					</div>
				</div>
				<div v-else style="float: left;margin-right: 10px;">
					<span>没有图片信息</span>
				</div>
				<el-upload
				:show-file-list="false"
				   name="upload_file"
				  action="/manage/product/upload.do"
				   :on-success="imgsuccess"
				  >
				  <el-button size="small" type="primary">点击上传</el-button>
				</el-upload>
			</p>
		</div>
		<div style="display: flex;margin-top: 20px;">
			<p style="margin-right: 0;"><span>商品详情</span></p>
			<el-upload class="avatar-uploader" action="/manage/product/upload.do" name="upload_file" :show-file-list="false"
			 :on-success="uploadSuccess"  :before-upload="beforeUpload">
			</el-upload>
			<quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" class="quill">
			</quill-editor>
		</div>
		<p style="margin-left: 150px;margin-top: 80px;">
			<el-button type="primary" @click="submit()">提交</el-button>
		</p>
	</div>
</template>

<script>
	import toolbarOptions from '../quill.js'
	export default {
		data() {
			return {
				msg: '商品管理 -- 添加商品',
				options: [],
				value: '',
				options2: [],
				value2: '',
				list: {},
				imgs: [],
				selectedOptions: [],
				fileList: [],
				content: null,
				editorOption: {
					placeholder: '',
					theme: 'snow', // or 'bubble'
					modules: {
						toolbar: {
							container: toolbarOptions,
							handlers: {
								'image': function(value) {
									if (value) {
										// 触发input框选择图片文件
										document.querySelector('.avatar-uploader input').click()
									} else {
										this.quill.format('image', false);
									}
								}
							}
						}
					}
				},
			}

		},
		methods: {
			del(idx){
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					this.imgs.splice(idx,1)
				  this.$message({
					type: 'success',
					message: '删除成功!'
				  });
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '已取消删除'
				  });          
				});
				
			},
			sel() {
				this.value2 = '';
				let postData = this.$qs.stringify({
					categoryId: this.value
				})
				// console.log(postData)
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
			imgsuccess(response){
				// console.log(response.data.uri);
				this.imgs.push(response.data.uri)
			},
			getData() {
				let postData = this.$qs.stringify({
					productId: this.$route.params.id
				})
				this.$axios.post('/manage/product/detail.do', postData).then((res) => {
					if (res.data.status == 0) {
						this.list = res.data.data
						this.content = this.list.detail
						this.msg = '商品管理 -- 修改商品'
						// console.log(this.list)
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
			},
			submit() {
				if(this.list.name==undefined){
					this.$message({
					  message: '请填写商品名称',
					  type: 'warning'
					});
					return
				}
				if(this.list.subtitle==undefined){
					this.$message({
					  message: '请填写商品描述',
					  type: 'warning'
					});
					return
				}if(this.value==""){
					this.$message({
					  message: '请填写商品一级分类',
					  type: 'warning'
					});
					return
				}if(this.value2==""){
					this.$message({
					  message: '请填写商品二级分类',
					  type: 'warning'
					});
					return
				}if(this.list.price==undefined){
					this.$message({
					  message: '请填写商品价格',
					  type: 'warning'
					});
					return
				}if(this.list.stock==undefined){
					this.$message({
					  message: '请填写商品库存',
					  type: 'warning'
					});
					return
				}
				if(this.list.stock==undefined){
					this.list.stock=1
				}
				// console.log(this.list.name)
				let isimgs=this.imgs.join(",")
				// console.log(isimgs)
				let postData = this.$qs.stringify({
					parentCategoryId:this.value,
					categoryId:this.value2,
					name: this.list.name,
					subtitle: this.list.subtitle,
					subImages: isimgs,
					detail: this.content,
					price: this.list.price,
					id: this.$route.params.id,
					stock: this.list.stock,
					status: this.list.status,
				})
				// console.log(postData)
				this.$axios.post('/manage/product/save.do', postData).then((res) => {
					if(res.status==200){
							this.$message({
							message: res.data.data,
							type: 'success'
						});
					}else{
						 this.$message.error('服务器崩了~~~');
					}
					
					this.$router.push({
						path: '/index/shop'
					})
				});
			},
			// 富文本图片上传前
			beforeUpload() {
				// 显示loading动画
				this.quillUpdateImg = true
			},
			uploadSuccess(res, file) {
				// res为图片服务器返回的数据
				// 获取富文本组件实例
				let quill = this.$refs.myQuillEditor.quill
				// 如果上传成功
				if (res.status == 0) {
					// 获取光标所在位置
					let length = quill.getSelection().index;
					// 插入图片  res.url为服务器返回的图片地址
					quill.insertEmbed(length, 'image', res.data.url)
					// 调整光标到最后
					quill.setSelection(length + 1)
				} else {
					this.$message.error('图片插入失败')
				}
				// loading动画消失
				this.quillUpdateImg = false
			},
		},
		mounted() {
			this.select();
			this.getData();
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
			margin: 0 30px;
			font-weight: 600;
			float: left;
			width: 65px;
		}

		.el-input {
			width: 400px;
		}
	}

	.imgs {
		width: 80px;
		height: 80px;
		margin: 0 5px;
		border: 1px solid #ccc;
		cursor: pointer;
		
	}
	.el-select {
		width: 200px;
	}
	.el-icon-delete{
		display: none;
		font-weight: 600;
		top: 50%;
		left: 50%;
		position: absolute;
		margin-left: -8px;
		margin-top: -8px;
	}
	.delimg{
		display: inline-block;
		position: relative;
	}
	.delimg:hover{
		img{
			opacity: 0.6;
		}
		.el-icon-delete{
			display: block;
		}
	}
</style>
