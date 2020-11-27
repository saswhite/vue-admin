<template>
  <div>
    <span>{{ time }}</span>
    <span style="margin-left : 5px">{{ renderWeek }}</span>
  </div>
</template>

<script>
import moment from 'moment-timezone';

/* common */
import { getWeek } from '../utils/common';

export default {
    name:'TimeInterval',
    data () {
        return {
            time:moment.tz('America/New_York').clone().format('YYYY-MM-DD HH:mm:ss'),
            timer:''
        };
    },
    computed:{
        renderWeek (){
            return getWeek(moment.tz('America/New_York').clone().day());
        }
    },
    mounted (){
        this.timer = setInterval(this.handleInterval,1000);
    },
    beforeDestroy (){
        clearInterval(this.timer);
    },
    methods:{
        handleInterval (){
            this.time = moment.tz('America/New_York').clone().format('YYYY-MM-DD HH:mm:ss');
        }
    }
};
</script>

<style>

</style>