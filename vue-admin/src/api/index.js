import api from '../utils/axios';

export function RestaurantList (){
    const result = api.get('/restaurant/location/-74.0059413,40.7127837');
    return result;
}