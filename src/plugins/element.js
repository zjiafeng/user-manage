import Vue from 'vue'
import { Button,Card,Input,Message,Row,Col,Container,Header,Aside,Main,Dropdown,DropdownMenu, Icon,DropdownItem,Menu,Submenu,MenuItem,MenuItemGroup, Select,Option,Table,TableColumn,Pagination,MessageBox,Loading,Cascader,Upload,Dialog,Image } from 'element-ui'
Vue.prototype.$message=Message
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$alert = MessageBox.alert;
Vue.use(Button)
Vue.use(Card)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(Icon)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Loading)
Vue.use(Cascader)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Image)
