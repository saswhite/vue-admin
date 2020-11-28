import * as types from  './mutation-type';

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
            let result = await Tags();
            commit(types.SET_TAG_LIST,result);
        } catch (error) {
            console.log(error);
        }
    }
};