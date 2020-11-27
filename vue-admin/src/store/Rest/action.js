import * as types from './mutation-type';
import { RestaurantList,UpdateRestInfo } from '../../api/index';
import { Loading } from 'element-ui';
import _ from 'lodash';

export default {
    async renderRestList ({ commit }){
        try {
            const loading = Loading.service({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let result =  await RestaurantList();
            commit(types.RENDER_REST_LIST,result);
            loading.close();

        } catch (err) {
            console.log(err);
        }
    },
    async updateRestList ({ commit },data){
        try {
            const loading = Loading.service({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let newData =  {
                id:data._id,
                data:{
                    ..._.omit(data,'_id')
                }
            };
            await UpdateRestInfo(newData);
            let result =  await RestaurantList();
            commit(types.RENDER_REST_LIST,result);
            loading.close();
        } catch (error) {
            console.log(error);
        }
    }
};