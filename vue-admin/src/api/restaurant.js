import { RestaurantList } from './index';
import { Loading } from 'element-ui';

export function getRestaurantList (){
    const loading = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
    let result = RestaurantList();
    loading.close();

    return result;
}