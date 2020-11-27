<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="isShowModal"
      :before-close="handleClose"
      width="600px"
      @open="handleOpen"
    >
      <el-form
        ref="restForm"
        :model="restForm"
      >
        <el-form-item
          label="餐馆名称:"
          class="restTitle"
        >
          <el-select
            v-model="restForm.lan"
            @change="hangdleLan"
          >
            <el-option
              label="中文"
              value="zh-CN"
            ></el-option>
            <el-option
              label="英文"
              value="en-US"
            ></el-option>
          </el-select>
          <el-input
            v-model="restForm.titleValue"
          />
        </el-form-item>
        <el-form-item
          label="餐馆标签:"
        >
          <el-select
            v-model="tagSelectValue"
            @change="hangdleTag"
          >
            <el-option
              v-for="(item,index) in tagData"
              :key="index"
              :value="item"
              :label="item"
            />
          </el-select>
          <span class="tags-container">
            <el-tag
              v-for="tag in restForm.tagsValue"
              :key="tag"
              :disable-transitions="false"
              :color="colorData[parseInt(Math.random() * colorData.length)]"
              closable
              effect="dark"
              class="tag-item"
              @close="handleTagClose(tag)"
            >
              {{ tag.toUpperCase() }}
            </el-tag>
          </span>
        </el-form-item>
        <el-form-item
          label="开门时间:"
        >
          <label class="date-title">
            纽约当地时间
          </label>
          <TimeInterval class="timeInterval" />
          <div class="time-picker">
            <div
              v-for="(item,index) in renderTimePicker"
              :key="item.week"
            >
              <el-tag>
                {{ item.week }}
              </el-tag>
              <el-time-picker
                v-model="item.timeRank"
                is-range
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
                @input="hangdeTime($event,index)"
              />
            </div>
          </div>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">取消</el-button>
        <el-button
          type="primary"
          @click="handleUpdate"
        >
          保存
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
import _ from 'lodash';
import moment from 'moment';

/* common */
import { colorList } from '../../../../utils/config';
import { getWeek } from '../../../../utils/common';

/* components */
import TimeInterval from '../../../../components/timeInterval.vue';

export default {
    name:'Modal',
    components: { TimeInterval },
    data () {
        return {
            restForm:{
                lan:'zh-CN',
                titleValue:'',
                tagsValue:[],
                timeValue:[]
            },
            restData:{},
            tagData:[],
            tagSelectValue:'noodle',
            title:'',
            colorData: colorList
        };
    },
    computed:{
        ...mapGetters('modal',{
            isShowModal:'isShow',
            restInfo:'restInfo',
            tagList:'tagList'
        }),
        renderTimePicker (){
            let clone =  _.cloneDeep(this.restForm.timeValue);
            while(clone.length < 7){
                clone.push({});
            }
            return  _.map(clone.splice(0,7),(item,index)=>{
                return {
                    timeRank:[
                        item.start ? moment().startOf('day').add(item.start,'minutes') : moment().startOf('day'),
                        item.end ? moment().startOf('day').add(item.end,'minutes') : moment().startOf('day') ],
                    week:getWeek(index + 1)
                };
            });
        }
    },
    watch:{
        restInfo (val){
            this.restData = val;
            this.title = _.cloneDeep(this.restData).name['zh-CN'];
            this.restForm.titleValue = _.cloneDeep(this.restData).name['zh-CN'];
            this.restForm.timeValue = _.cloneDeep(this.restData).hours;
            this.restForm.tagsValue = _.cloneDeep(this.restData).tags;
        }
    },
    async created (){
        await this.setTagList();
        this.tagData = this.tagList;
    },
    methods:{
        ...mapActions('modal',{
            setShowModal:'showModal',
            setTagList:'setTagList'
        }),
        ...mapActions('rest',{
            updateRestList:'updateRestList'
        }),
        handleClose (){
            this.setShowModal(false);
        },
        handleOpen (){
            this.restForm.titleValue = _.cloneDeep(this.restData).name[this.restForm.lan];
            this.title = _.cloneDeep(this.restData).name[this.restForm.lan];
            this.restForm.timeValue = _.cloneDeep(this.restData).hours;
            this.restForm.tagsValue = _.cloneDeep(this.restData).tags;
        },
        hangdleLan (lan){
            this.title = _.cloneDeep(this.restData).name[lan];
            this.restForm.titleValue = _.cloneDeep(this.restData).name[lan];
        },
        hangdleTag (tag){
            if(_.indexOf(this.restForm.tagsValue,tag) < 0 && _.indexOf(this.restForm.tagsValue,tag.toUpperCase()) < 0){
                this.restForm.tagsValue.push(tag);
            }
        },
        handleTagClose (tag){
            console.log(tag);
            if(_.indexOf(this.restForm.tagsValue,tag) >= 0) {
                this.restForm.tagsValue.splice(_.indexOf(this.restForm.tagsValue,tag),1);
            }
        },
        hangdeTime (newTime,index){
            let week = 0;
            if(index < 6){
                week = index + 1;
            }else {
                week = 0;
            }
            let data = {
                type: 'delivery',
                dayOfWeek:week,
                start: moment(newTime[0]).minute() + moment(newTime[0]).hour() * 60,
                end: moment(newTime[1]).minute() + moment(newTime[1]).hour() * 60,
            };
            this.restForm.timeValue[index] = data;
            this.$forceUpdate();
        },
        handleUpdate (){
            let newData = {
                ...this.restData,
                hours:this.restForm.timeValue,
                tags:this.restForm.tagsValue,
            };
            newData.name[this.restForm.lan] = this.restForm.titleValue;
            this.updateRestList(newData);
            this.setShowModal(false);
        }
    }
};

</script>

<style lang="scss" scoped>

.restTitle{
  display : flex;
}
.el-input {
  width : 200px;
}
.tag-item {
  margin-left : 5px;
}
.date-title{
  position : relative;
  bottom : 5px;
  display : inline-block;
  font-size : 12px;
  opacity : .6;
}
.timeInterval{
  position : relative;
  top : -20px;
  left :70px;
  font-size : 24px;
}
.time-picker {
  margin-left : 70px;
  .el-tag {
    height : 39px;
    line-height : 39px;
    border-radius : 0;
  }
}
.tags-container {
  display : inline-block;
  width : 250px;
  vertical-align : top;
}

</style>