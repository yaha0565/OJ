<template>
	<div class="app-shell">
		<!-- 顶部导航栏：Logo + 用户入口 -->
		<header class="topbar">
			<div class="topbar-inner">
				<router-link to="/" class="logo">
					<span class="logo-icon">X</span>
					<span class="logo-text">XDOJ</span>
				</router-link>
				<div class="topbar-right">
					<div v-if="!store.state.IsLogin" class="navright">
						<el-button type="primary" @click="openlogindialog" text>登录</el-button>
						<el-button type="primary" @click="openregisterdialog" text>注册</el-button>
					</div>
					<div v-if="store.state.IsLogin" class="navright">
						<el-dropdown @command="handleCommand" id="user">
							<el-button type="primary" text>
								<el-icon><User /></el-icon> &nbsp {{store.state.NickName}}<el-icon class="el-icon--right"><arrow-down /></el-icon>
							</el-button>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item command="userhome">
										<el-icon><User /></el-icon>个人主页
									</el-dropdown-item>
									<el-dropdown-item command="statusrecord">
										<el-icon><Edit /></el-icon>我的提交
									</el-dropdown-item>
									<el-dropdown-item command="discuss">
										<el-icon><Edit /></el-icon>我的讨论
									</el-dropdown-item>
									<el-dropdown-item command="solution">
										<el-icon><Edit /></el-icon>我的题解
									</el-dropdown-item>
									<el-dropdown-item command="usersetting">
										<el-icon><Setting /></el-icon>设置
									</el-dropdown-item>
									<el-dropdown-item command="admin" v-if="store.state.IsAdmin">
										<el-icon><Odometer /></el-icon>管理员
									</el-dropdown-item>
									<el-dropdown-item command="logout">
										<el-icon><SwitchButton /></el-icon>退出登录
									</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</div>
				</div>
			</div>
		</header>

		<div class="body">
			<!-- 左侧导航栏 -->
			<aside class="sidebar">
				<el-menu :default-active="activePath" class="sidebar-menu" router>
					<el-menu-item index="/">
						<el-icon><HomeFilled /></el-icon>
						<span>首页</span>
					</el-menu-item>
					<el-menu-item index="/problemlist">
						<el-icon><Grid /></el-icon>
						<span>题库</span>
					</el-menu-item>
					<el-menu-item index="/statusrecord">
						<el-icon><Tools /></el-icon>
						<span>测评</span>
					</el-menu-item>
					<el-menu-item index="/discusslist">
						<el-icon><Comment /></el-icon>
						<span>讨论</span>
					</el-menu-item>
					<el-menu-item index="/userrank">
						<el-icon><Histogram /></el-icon>
						<span>排名</span>
					</el-menu-item>
				</el-menu>
			</aside>

			<!-- 主内容区 -->
			<main class="content">
				<login ref="logindialog"></login>
				<register ref="registerdialog"></register>
				<router-view></router-view>
			</main>
		</div>

		<footer class="footer">
			<p>Powered by XXX</p>
		</footer>
	</div>
</template>
<script setup>
import Register from './components/Dialog/Register.vue'
import Login from './components/Dialog/Login.vue'

import { ref, computed } from 'vue'
import store from './store'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter();
const route = useRoute();

const logindialog = ref()
const registerdialog = ref()

// 根据当前路径计算侧栏高亮项
const activePath = computed(() => {
	const p = route.path
	if (p === '/') return '/'
	if (p.startsWith('/problem') || p.startsWith('/solution')) return '/problemlist'
	if (p.startsWith('/statusrecord')) return '/statusrecord'
	if (p.startsWith('/discuss')) return '/discusslist'
	if (p.startsWith('/user') || p.startsWith('/admin')) return '/userrank'
	return '/'
})

function openlogindialog(){
	logindialog.value.open()
}
function openregisterdialog(){
	registerdialog.value.open()
}
function handleCommand(command){
	if(command == "userhome"){
		router.push({name:"UserHome",query:{UserId:store.state.UserId}})
	}else if(command == "usersetting"){
		router.push({name:"UserSetting",query:{UserId:store.state.UserId}})
	}else if(command == "admin"){
		router.push({name:"Admin"})
	}else if(command == "statusrecord"){
		router.push({
			name:"StatusRecord",
			query:{
				UserId:store.state.UserId
			}
		})
	}else if(command == "discuss"){
		router.push({
			name:"DiscussList",
			query:{
				UserId:store.state.UserId
			}
		})
	}else if(command == "solution"){
		router.push({
			name:"SolutionList",
			query:{
				UserId:store.state.UserId
			}
		})
	}else if(command = "logout"){
		store.commit('Logout')
		router.push({name:'HomePage'})
	}
}
</script>
<style scoped>
.app-shell {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

/* 顶部导航栏 */
.topbar {
	position: sticky;
	top: 0;
	z-index: 100;
	background-color: #ffffff;
	border-bottom: 1px solid var(--luogu-border);
}
.topbar-inner {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 56px;
	padding: 0 24px;
	max-width: 1200px;
	margin: 0 auto;
}
.logo {
	display: flex;
	align-items: center;
	text-decoration: none;
	color: #303133;
}
.logo-icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 32px;
	height: 32px;
	border-radius: 8px;
	background-color: var(--el-color-primary);
	color: #fff;
	font-size: 18px;
	font-weight: 700;
	margin-right: 10px;
}
.logo-text {
	font-size: 20px;
	font-weight: 700;
	color: #303133;
}
.topbar-right {
	display: flex;
	align-items: center;
	gap: 8px;
}
.navright {
	display: flex;
	align-items: center;
}

/* 主体：侧栏 + 内容 */
.body {
	display: flex;
	flex: 1;
	max-width: 1200px;
	width: 100%;
	margin: 0 auto;
	padding: 16px 16px 0;
	gap: 16px;
}
.sidebar {
	flex-shrink: 0;
	width: 180px;
}
.sidebar-menu {
	border-right: none;
	border-radius: var(--luogu-card-radius);
	background-color: #ffffff;
	border: 1px solid var(--luogu-border);
	overflow: hidden;
}
.content {
	flex: 1;
	min-width: 0;
}

/* 页脚 */
.footer {
	width: 100%;
	margin-top: 20px;
	margin-bottom: 10px;
	text-align: center;
	font-size: small;
	color: #909399;
}
</style>
