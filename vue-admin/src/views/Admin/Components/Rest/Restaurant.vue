<template>
  <div>
    <Breadcrumb :route="$route.path" />
    <el-table
      :data="restPageData"
    >
      <el-table-column
        label="餐馆"
        prop="restTitle"
      >
      </el-table-column>
      <el-table-column
        label="地址"
        prop="address"
      >
      </el-table-column>
      <el-table-column
        label="标签"
        prop="tags"
      >
        <template slot-scope="scope">
          <el-tag
            v-for="item in scope.row.tags"
            :key="item"
            :color="colorData[parseInt(Math.random() * colorData.length)]"
            effect="dark"
            style="margin-left : 5px"
          >
            {{ item.toUpperCase() }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            @click="handleModal(scope)"
          >
            操作
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="手动关闭"
        prop="isClose"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isClose"
            @change="handleClose($event,scope.row.clone)"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        :page-size="10"
        layout="prev, pager, next"
        :total="restList.length"
        @current-change="handlePageChange"
      >
      </el-pagination>
    </div>
    <Modal />
  </div>
</template>

<script>
import _ from 'lodash';
import { mapActions,mapGetters } from 'vuex';

/* common */
import { colorList } from '../../../../utils/config';

/* components */
import Breadcrumb from '../../../../components/Breadcrumb.vue';
import Modal from '../Modal/modal';

export default {
    name:'Rest',
    components: {
        Breadcrumb,
        Modal
    },
    data () {
        return {
            isClose:false,
            restList:[],
            restPageData:[],
            colorData: colorList,
            restInfo:{}
        };
    },
    computed:{
        ...mapGetters('rest',{
            restData:'restList'
        })
    },
    watch:{
        restData (){
            this.renderRest();
        }
    },
    async created (){
        await this.setRestList();
        this.renderRest();
    },
    methods:{
        ...mapActions('modal',{
            setShowModal:'showModal',
            setRestInfo:'setRestInfo'
        }),
        ...mapActions('rest',{
            setRestList:'renderRestList',
            updateRestList:'updateRestList'
        }),
        renderRest (){
            this.restList = _.map(this.restData,item=>{
                let closed = item.closed ? true : false;
                let restItem = {
                    restTitle : item.name['zh-CN'],
                    address: item.address.formatted,
                    tags: item.tags,
                    isClose: closed,
                    clone:_.cloneDeep(item)
                };
                return restItem;
            });
            this.restPageData = _.chunk(this.restList,10)[0];
        },
        async handleModal (scope){
            await this.setRestInfo(scope.row.clone);
            this.setShowModal(true);
        },
        handlePageChange (page){
            this.restPageData = _.chunk(this.restList,10)[page - 1];
        },
        handleClose (checked,item){
            let closed = checked ? { closed:true } : null;
            this.updateRestList({
                ...item,
                closed: closed
            });
        }
    }
};
</script>

<style>
.pagination {
  display : flex;
  justify-content : flex-end;
}
</style>