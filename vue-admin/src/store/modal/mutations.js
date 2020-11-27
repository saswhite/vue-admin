import * as types from './mutation-type';

export default {
    [types.SHOW_MODAL] (state,data){
        state.isShow = data;
    },
    [types.SET_REST_INFO] (state,data){
        state.restInfo = data;
    },
    [types.SET_TAG_LIST] (state,data){
        state.tagList = data;
    }
};