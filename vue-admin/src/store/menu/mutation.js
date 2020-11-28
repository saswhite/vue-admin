import * as type from './mutation-type';

export default {
    [type.SET_FOOD_LIST] (state,data){
        state.foodList = data;
    },
};