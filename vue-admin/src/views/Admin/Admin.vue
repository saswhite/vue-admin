<template>
  <el-container>
    <el-menu
      class="menu el-menu-vertical-demo"
      :default-active="$route.path"
      router
      :collapse="isCollapse"
    >
      <div
        class="logo"
      >
        <img
          :src="imgUrl"
          class="logo-img"
        />
      </div>
      <el-menu-item
        class="el-icon-s-goods menu-item"
        index="/admin/restaurant"
      >
        <span class="menu-item-title">
          餐馆
        </span>
      </el-menu-item>
      <el-menu-item
        class="el-icon-s-order menu-item"
        index="/admin/menu"
      >
        <span class="menu-item-title">
          菜单
        </span>
      </el-menu-item>
      <el-menu-item
        class="el-icon-s-data menu-item"
        index="/admin/order"
      >
        <span class="menu-item-title">
          订单
        </span>
      </el-menu-item>
      <el-button
        class="logout-btn"
        type="primary"
      >
        登出
      </el-button>
      <el-button
        class="collapse-btn"
        @click="handleCollapse"
      >
        {{ isCollapse ? '&gt;' : "&lt;" }}
      </el-button>
    </el-menu>
    <el-container>
      <el-header
        style="height : 60px"
        class="header"
      >
        <h1 class="header-title">
          Tasty后台管理系统
        </h1>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer class="footer">
        DELIVERY ADMIN ©2020 Created by SASWHITE
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>

/* img */
import { IMG_URL } from '../../utils/config';

export default {
    name:'Admin',
    data () {
        return {
            imgUrl:IMG_URL,
            isCollapse: false,
        };
    },
    methods:{
        handleCollapse (){
            this.isCollapse = !this.isCollapse;
        }
    }
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width : 250px;
    min-height : 400px;
}
.logo {
  position : relative;
  display : flex;
  justify-content : center;
  height : 120px;
  &-img{
    position : absolute;
    top : 0;
    right : 0;
    bottom : 0;
    left : 0;
    height : 60px;
    margin : auto;
  }
}
.menu {
  position : relative;
  display : flex;
  flex-direction : column;
  min-height : 100vh;
  &-item{
    text-align : center;
    &-title{
      margin-left : 5px;
    }
  }
}
.logout-btn {
  position : absolute;
  top : 85vh;
  left : 50%;
  display : flex;
  justify-content : center;
  width : 30%;
  transform : translateX(-50%);
}

.header {
  display : flex;
  align-items : center;
  border-bottom : 1px solid #eee;
  &-title {
    color : transparent;
    text-shadow : rgba(255,255,255,.5) 0 5px 6px,rgba(255,255,255,.2) 1px 3px 3px;
    background-color : #000;
    background-clip : text;
  }
}

.collapse-btn {
  position : fixed;
  bottom : 0;
  left : 0;
  width : 250px;
  margin : 0;
}
.footer {
  text-align : center;
}
</style>
