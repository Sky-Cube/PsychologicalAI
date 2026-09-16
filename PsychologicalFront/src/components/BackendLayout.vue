<template>
  <div class="backend-layout">
    <el-container class="main-container">
        <!-- 侧边栏：折叠状态由 Pinia store 下发，无需 props 透传 -->
        <Sidebar />
        <el-container class="main-container">
            <el-header class="back-nav">
            <!-- 导航栏：折叠状态由 Pinia store 下发，无需 props 透传 -->
            <Navbar />
            </el-header>
            <el-main class="main-container">
                <router-view class="content-container"></router-view>
            </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'

// 侧边栏折叠状态：唯一数据源为 Pinia store（stores/admin.js）
// Sidebar / Navbar 各自通过 storeToRefs 按需订阅，布局层不再持有该状态
</script>

<style lang="scss" scoped>
    .backend-layout{
      height: 100vh;
      .el-header{
        height: 74px !important;
        // 覆盖 Element Plus 默认的 --el-header-padding: 0 20px，消除导航栏左右内缩
        --el-header-padding: 0;
        padding: var(--el-header-padding);
      }
      .main-container{
        height: 100%;
        .content-container{
          padding: 20px;
          background-color: #fff;
          min-height: calc(100% - 74px);
        }
      }
    }
    .main-container{
      height: 100vh;
      background-color: 	#F8F8FF;
    }
</style>
