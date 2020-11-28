import * as types from './mutation-type';
import { RestaurantList,UpdateRestInfo } from '../../api/index';
import _ from 'lodash';

export default {
    async renderRestList ({ commit }){
        try {
            let result =  await RestaurantList();
            commit(types.RENDER_REST_LIST,result);
        } catch (err) {
            console.log(err);
        }
    },
    async updateRestList ({ commit },data){
        try {
            let newData =  {
                id:data._id,
                data:{
                    ..._.omit(data,'_id')
                }
            };
            await UpdateRestInfo(newData);
            let result =  await RestaurantList();
            commit(types.RENDER_REST_LIST,result);
        } catch (error) {
            console.log(error);
        }
    }
};