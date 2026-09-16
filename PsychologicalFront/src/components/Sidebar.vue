<template>
  <div class="sidebar-layout">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '64px' : '264px'">
      <el-menu
        :default-active="$route.path"
        class="menu-style"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
      >
      <!-- ========== 品牌logo区域 ========== -->
      <div class="brand" :class="{ 'is-collapse': isCollapse }">
        <el-image :src="logoURL" alt="logo" class="robot-icon" />
        <div v-show="!isCollapse" class="info-card">
          <h1 class="brand-title">心理健康AI助手</h1>
          <p class="brand-subtitle">管理后台</p>
        </div>
        <!-- 折叠按钮 -->
        <el-button
          circle
          class="collapse-btn"
          :title="isCollapse ? '展开菜单' : '收起菜单'"
          @click="isCollapse = !isCollapse"
        >
          <el-icon>
            <component :is="isCollapse ? 'Expand' : 'Fold'" />
          </el-icon>
        </el-button>
      </div>

      <div class="brand-divider" v-show="!isCollapse"></div>

      <!-- 菜单列表 -->
      <el-menu-item
        v-for="item in router.options.routes?.[0]?.children || []"
        :key="item.path"
        :index="'/back/' + item.path"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 主内容区域（router-view） -->
    <div class="main-wrap">
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// logo 静态资源：走 Vite 模块解析，支持 @ 别名，构建时会自动处理路径与哈希
import logoURL from '@/assets/images-admin/logo.png'
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
.sidebar-layout {
  display: flex;
  height: 100vh;
}
.main-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.menu-style {
  height:100%;
  // 左上角logo区域（logo + 标题 + 折叠按钮）
  .brand {
    display: flex;
    align-items: center; /* 垂直居中，图片和文字对齐 */
    gap: 8px; /* 图片和文字之间的间距 */
    padding: 12px 16px;
    /* 折叠态：文字已隐藏，改为纵向排列并收紧内边距，适配 64px 侧边栏宽度 */
    &.is-collapse {
      flex-direction: column;
      gap: 8px;
      padding: 12px 8px;
    }
    .brand-title {
      font-size: 18px;
      font-weight: bold;
      margin: 0;
      line-height: 1.2;
      // white-space: nowrap;  // 注释掉，允许文字自动换行！解决文字截断
      overflow: visible;
      text-overflow: unset;
    }
    .brand-subtitle {
      font-size: 14px;
      color: #666;
      margin: 0;
    }
  }
  // 分割线（放到brand外面，不再在flex一行里面）
  .brand-divider {
    height: 1px;
    background-color: #e4e7ed;
    margin: 0 16px 12px;
  }
}
.robot-icon {
  width: 50px;
  height: 50px;
  flex-shrink: 0; /* 图片不压缩 */
  /* 折叠态缩小 logo，为折叠按钮让出空间 */
  :deep(.brand.is-collapse) & {
    width: 32px;
    height: 32px;
  }
}
.info-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1; /* 占满剩余空间，把折叠按钮推到最右侧 */
  min-width: 0; /* 防止长文本撑破 flex 容器 */
}
.collapse-btn {
  flex-shrink: 0; /* 按钮不压缩 */
}
</style>
