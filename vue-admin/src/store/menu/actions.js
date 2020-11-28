import * as type from './mutation-type';
import _ from 'lodash';
import { FoodList,UpdataFoodList } from '../../api/index';

export default {
    async setFoodList ({ commit },data){
        try {
            let result =  await FoodList(data);
            console.log(result);
            commit(type.SET_FOOD_LIST,result);
        } catch (error) {
            console.log(error);
        }
    },
    async updateFoodList ({ commit },data){
        try {
            let newData = {
                id:data.newData._id,
                data:{
                    ..._.omit(data.newData,'_id')
                }
            };
            await UpdataFoodList(newData);
            let result =  await FoodList(data.pageData);
            console.log(result);
            commit(type.SET_FOOD_LIST,result);
        } catch (error) {
            console.log(error);
        }
    },
    clearFoodList ({ commit }){
        let newData = {};
        commit(type.SET_FOOD_LIST,newData);
    }
};