import * as types from './mutation-type';

export default {
    [types.RENDER_REST_LIST] (state,data){
        state.restList = data;
    }
};