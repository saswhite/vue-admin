<template>
  <div>
    <Breadcrumb :route="$route.path" />
    <div class="menu-container">
      <el-select
        v-model="restName"
        filterable
        :filter-method="filterRestName"
        placeholder="请选择"
        @change="handleFood"
      >
        <el-option
          v-for="(item,index) in restNameList"
          :key="index"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>
    <div class="menu-main">
      <el-table
        :data="foodData"
      >
        <el-table-column
          prop="foodName"
        >
          <template
            slot="header"
          >
            <label class="foodTitle">菜品</label>
            <el-popover>
              <input
                v-model="searchValue"
                class="search-input"
                @keydown="keydownEnter"
              />
              <el-button

                @click="handleSearch"
              >
                搜索
              </el-button>
              <el-button
                slot="reference"
                class="el-icon-search search-btn"
              >
              </el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="价格"
          prop="price"
        >
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status"
        >
          <template slot-scope="scope">
            <el-switch
              :value="scope.row.status"
              @change="hangdleStatus($event,scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          layout="prev, pager, next,sizes"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          @current-change="handlePageChange"
          @size-change="hangdleSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapActions,mapGetters } from 'vuex';
import { match } from 'pinyin-match';

/* components */
import Breadcrumb from '../../../../components/Breadcrumb.vue';

export default {
    name:'Menu',
    components: { Breadcrumb },
    data () {
        return {
            restNameList:[],
            restNameListCopy:[],
            restName:'',
            total:0,
            foodData:[],
            pageData:{
                id:'',
                page:1,
                limit:10,
                keyword:''
            },
            searchValue:'',
            disabeld:true
        };
    },
    computed:{
        ...mapGetters('rest',{
            restData:'restList'
        }),
        ...mapGetters('menu',{
            foodList:'foodList'
        }),
        renderDisable (){
            return this.foodList === undefined ? false : true;
        }
    },
    watch:{
        foodList (){
            this.renderFoodData();
        }
    },
    async created (){
        this.clearFoodList();
        await this.setRestList();
        this.renderRestNameList();
    },
    methods:{
        ...mapActions('rest',{
            setRestList:'renderRestList'
        }),
        ...mapActions('menu',{
            setFoodList:'setFoodList',
            updateFoodList:'updateFoodList',
            clearFoodList:'clearFoodList'
        }),
        renderRestNameList (){
            this.restNameList = _.map(this.restData,item=>{
                return item.name['zh-CN'];
            });
            this.restNameListCopy = this.restNameList;
        },
        filterRestName (val){
            this.restName = val;
            if(val){
                this.restNameList = _.filter(this.restNameListCopy,item=>{
                    return match(item,val);
                });
            }else {
                this.restNameList = this.restNameListCopy;
            }
        },
        renderFoodData (){
            this.total = this.foodList.count;
            this.foodData = _.map(this.foodList.list,item=>{
                let clone = _.cloneDeep(item);
                return {
                    foodName:item.name['zh-CN'],
                    price:`$ ${(item.price / 100).toFixed(2)}`,
                    status: item.available,
                    id: item._id,
                    clone:clone
                };
            });

        },
        handleFood (val){
            _.forEach(this.restData,item=>{
                if(item.name['zh-CN'] === val){
                    this.pageData.id = item._id;
                }
            });
            this.setFoodList(this.pageData);
        },
        hangdleStatus (status,row){
            let data = {
                pageData: this.pageData,
                newData:{
                    ...row.clone,
                    available:status
                }
            };
            this.updateFoodList(data);
        },
        handlePageChange (page){
            this.pageData.page = page;
            this.setFoodList(this.pageData);
        },
        hangdleSizeChange (limit){
            this.pageData.limit = limit;
            this.setFoodList(this.pageData);
        },
        handleSearch (){
            if(this.foodData.length > 0){
                this.pageData.keyword = this.searchValue;
                this.setFoodList(this.pageData);
            }
        },
        keydownEnter (e){
            if(e.keyCode === 13 ){
                this.handleSearch();
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.menu-container {
  margin-top : 20px;
}
.menu-main {
  margin-top : 20px;
  .column-name {
  display : flex;
  justify-content : space-between;
}
}
.pagination {
  display : flex;
  justify-content : flex-end;
}
.foodTitle {
  margin-right : 130px;
}
.search-btn {
  border-width : 0;
}
.search-input {
  width : 100%;
  height : 30px;
  font-size :15px;
  outline : none;
}
</style>