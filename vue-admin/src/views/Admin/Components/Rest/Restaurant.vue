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
            :key="item+'1'"
            :color="colorData[parseInt(Math.random() * colorData.length)]"
            effect="dark"
            style="margin-left : 5px"
          >
            {{ item }}
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
  </div>
</template>

<script>
import _ from 'lodash';

/* common */
import { colorList } from '../../../../utils/config';

/* components */
import Breadcrumb from '../../../../components/Breadcrumb.vue';

/* request */
import { getRestaurantList } from '../../../../api/restaurant';

export default {
    name:'Rest',
    components: { Breadcrumb },
    data () {
        return {
            isClose:false,
            restList:[],
            restPageData:[],
            colorData: colorList
        };
    },
    created (){
        this.renderRest();
    },
    methods:{
        async renderRest (){
            let result = await getRestaurantList();
            this.restList = _.map(result,item=>{
                let closed = item.closed ? true : false;
                let restItem = {
                    restTitle : item.name['zh-CN'],
                    address: item.address.formatted,
                    tags: item.tags,
                    isClose: closed
                };
                return restItem;
            });
            this.restPageData = _.chunk(this.restList,10)[0];
        },
        handleModal (scope){
            console.log(scope);
        },
        handlePageChange (page){
            this.restPageData = _.chunk(this.restList,10)[page - 1];
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