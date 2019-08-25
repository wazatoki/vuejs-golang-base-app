<template>
  <el-row style="text-align: left">
    <el-col :span="6">
      <router-link to="/">
        <span class="project-title">demo Application</span>
      </router-link>
    </el-col>
    <el-col :span="18" style="text-align: right">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/about">About</router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>menu</span>
    </el-col>
  </el-row>
</template>
