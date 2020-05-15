import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
var state={
		id:null,
		username:null,
		role:null,
		email:null,
		password:null
  }
if(sessionStorage.getItem('userinfo')){
	//如果 本地存储中有用户数据 初始化 此数据
	state=JSON.parse(sessionStorage.getItem('userinfo'));
}
export default new Vuex.Store({
  state,
  mutations: {
		userinfoinit:function(state,data){
			state.id=data.id;
			state.username=data.username;
			state.role=data.role;
			state.email=data.email;
			state.password=data.password;	
			//本地存储中保存一份用户的数据 防止刷新时数据的丢失
			sessionStorage.setItem('userinfo',JSON.stringify(state));		
		}
  },
  actions: {

  }
})


