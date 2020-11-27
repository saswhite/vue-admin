<template>
  <div>
    <Breadcrumb :route="$route.path" />
    <div class="menu-container">
      <el-select
        v-model="value"
        filterable
        placeholder="请选择"
      >
      <!-- <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option> -->
      </el-select>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '../../../../components/Breadcrumb.vue';
export default {
    name:'Menu',
    components: { Breadcrumb },
    data () {
        return {
            value:''
        };
    },
};
</script>

<style lang="scss" scoped>
.menu-container {
  margin-top : 20px;
}
</style>