<template>
  <div class="container">
    <div>
      404
    </div>
    <div>
      当前页面不存在，请检查网址是否正确
    </div>
    <div>
      <router-link to="/admin">
        返回首页
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
    name: 'NotFound'
};
</script>

<style lang="scss" scoped>
  .container {
    display : flex;
    flex-direction : column;
    align-items : center;
  }
</style>