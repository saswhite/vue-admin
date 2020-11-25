<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item,index) in route.split('/').splice(1)"
        :key="index+'1'"
      >
        <span :style="{'color':index === 1?'#000':'#606266'}">
          {{ item.charAt(0).toUpperCase()+item.slice(1) }}
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
    name:'Breadcrumb',
    filters:{
        capitalize: function (value) {
            if (!value) return '';
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    },
    props:{
        route: {
            type:String,
            default:''
        }

    }
};
</script>

<style>

</style>