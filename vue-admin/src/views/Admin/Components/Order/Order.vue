<template>
  <div>
    <Breadcrumb :route="$route.path" />
    order
  </div>
</template>

<script>
import Breadcrumb from '../../../../components/Breadcrumb.vue';
export default {
    name:'Order',
    components: { Breadcrumb },
};
</script>

<style>

</style>