// 评论区域模版
const template = (`
	<div class="takeComment">
		<textarea ref="contentRef" name="textarea" class="takeTextField" id="tijiaoText"></textarea>
		<div class="takeSbmComment">
			<input @click="postWeibo" type="button" class="inputs" value="" />
		</div>
	</div>
`)

// 定义评论请求
const methods = {
	// 发布评论请求
	async postWeibo(){
		// 获取评论框中的内容 定义请求体
		const contentBody = this.$refs.contentRef.value.trim();
		if(contentBody.length === 0){
			alert("请输入内容");
			return;
		}
		// 发送post请求
		await this.$axios.post("/weibo",{
			content:contentBody
		});
		// 把输入框清空
		this.$refs.contentRef.value = null;
		// 设置触发 获取评论 事件 刷新评论页面
		this.$bus.$emit('getWeibo');

	},
};
export default{
    template,
	methods
}