<template>
  <div>
    <Breadcrumb :route="$route.path" />
    menu
  </div>
</template>

<script>
import Breadcrumb from '../../../../components/Breadcrumb.vue';
export default {
    name:'Menu',
    components: { Breadcrumb },
};
</script>

<style>

</style>