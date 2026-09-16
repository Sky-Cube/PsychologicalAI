<template>
    <!-- 导航栏最外层容器 -->
    <div class="navbar">
        <!-- 左侧区域：按钮 + 页面标题 -->
        <div class="flex-box">
            <!-- 折叠按钮 -->
            <el-button
            circle
            class="collapse-btn"
            :title="isCollapse ? '展开菜单' : '收起菜单'"
            @click="handleCollapse"
            >
            <el-icon>
                <component :is="isCollapse ? 'Expand' : 'Fold'" />
            </el-icon>
            </el-button>
            <p class="page-title">导航栏</p>
        </div>
        <!-- 导航区域右侧用户登录区域-->
        <div class="flex-box">
            <!-- ElementPlus下拉菜单组件，@command：点击菜单项触发回调 -->
            <el-dropdown @command="handleCommand">
                <!-- 头像、用户名、下拉箭头容器 -->
                <div class="flex-box">
                    <!-- 头像组件，size尺寸，src图片地址 -->
                    <el-avatar :size="40" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    <p class="user-name">admin</p>
                    <el-icon><ArrowDown /> </el-icon>
                </div>
                <!-- #dropdown插槽：下拉弹出的菜单内容 -->
                <template #dropdown>
                    <!-- command="logout" 标记这个选项的标识，传给handleCommand -->
                    <el-dropdown-item command="logout" >退出登录</el-dropdown-item>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
// 侧边栏折叠状态：唯一数据源为 Pinia store
// storeToRefs 解构出的是响应式 ref，模板中可直接使用（模板会自动解包 .value）
import { storeToRefs } from 'pinia'
import { useAdminStore } from '@/stores/admin'

const { isCollapse } = storeToRefs(useAdminStore())

const handleCollapse = () => {
    // 修改侧边栏折叠状态
    useAdminStore().toggleCollapse()
}
// 退出登录逻辑
const handleCommand = (command) => {
    // 判断点击的菜单项标识
    if (command === 'logout') {
        // 删除本地存储的token和用户信息
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // 刷新页面，完成退出
        window.location.reload();
    }
}
</script>

<style lang="scss" scoped>
/* scoped 代表样式只作用于当前Navbar组件，不污染全局 */
.navbar {
  height: 100%;
  display: flex; /* 开启弹性布局 */
  align-items: center; /* 垂直方向居中 */
  justify-content: space-between; /* 左右子元素两端分开，左边靠左，右边靠右 */
  padding: 0 15px; /* 左右内边距清零，配合 el-header 的 padding:0 实现左右顶格 */
  background: white; /* 白色背景 */
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08); /* 底部阴影 */
  border-bottom: 1px solid #e5e7eb; /* 底部分割线 */

  .flex-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .page-title {
    margin-left: 20px;
    font-size: 26px;
    font-weight: bold;
    color: #1f2937;
  }
}

// 折叠按钮
.collapse-btn {
  flex-shrink: 0; /* 按钮不压缩 */
}
</style>
