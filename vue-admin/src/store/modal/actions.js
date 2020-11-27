import * as types from  './mutation-type';
import { Loading } from 'element-ui';

/* request */
import { Tags } from '../../api/index';

export default {
    showModal ({ commit },data){
        commit(types.SHOW_MODAL,data);
    },
    setRestInfo ({ commit },data){
        commit(types.SET_REST_INFO,data);
    },
    async setTagList ({ commit }){
        try {
            const loading = Loading.service({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let result = await Tags();
            commit(types.SET_TAG_LIST,result);
            loading.close();
        } catch (error) {
            console.log(error);
        }
    }
};