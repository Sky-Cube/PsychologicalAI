<template>
  <div class="backend-layout">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '64px' : '264px'">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
      >
      <div class="brand">
        <el-image src="/src/assets/logo.png" alt="logo" class="robot-icon" />
        <div class="info-card">
          <h1 class="brand-title">心理健康AI助手</h1>
          <p class="brand-subtitle">管理后台</p>
        </div>
      </div>

      <el-menu-item
        v-for="item in router.options.routes?.[0]?.children || []"
        :key="item.path"
        :index="item.path"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 主内容区域（包含折叠按钮 + router-view） -->
    <div class="main-wrap">
      <!-- 顶部导航栏，放折叠按钮 -->
      <el-header>
        <!-- 折叠按钮：点击切换isCollapse布尔值 -->
        <el-button
          icon="Menu"
          circle
          @click="isCollapse = !isCollapse"
        ></el-button>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// 全局路由实例，读取路由配置
const router = useRouter()
// 当前路由对象
const route = useRoute()
console.log(router ,'router')

// 侧边栏折叠状态
const isCollapse = ref(false)

const handleOpen = (key) => {
  console.log('菜单展开：', key)
}
const handleClose = (key) => {
  console.log('菜单关闭：', key)
}
</script>

<style lang="scss" scoped>
.backend-layout {
  display: flex;
  height: 100vh;
}
.main-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
}
// 左上角logo区域
.brand {
  display: flex;
  align-items: center; /* 垂直居中，图片和文字对齐 */
  gap: 10px; /* 图片和文字之间的间距 */
  padding: 12px 16px;
}

.robot-icon {
  width: 50px;
  height: 50px;
  flex-shrink: 0; /* 图片不压缩 */
}

.info-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.brand-title {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  line-height: 1.2;
}

.brand-subtitle {
  font-size: 14px;
  color: #666;
  margin: 0;
}
// logo区域结束

</style>
