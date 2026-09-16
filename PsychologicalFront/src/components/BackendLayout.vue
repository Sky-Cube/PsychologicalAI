<template>
  <div class="backend-layout">
    <el-container>
        <Sidebar />
        <el-container>
            <el-header>
            <Navbar />
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'
</script>

<style lang="scss" scoped>
    .backend-layoud{
      height: 100vh;
    }
</style>
