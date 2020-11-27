import api from '../utils/axios';

export function RestaurantList (){
    const result = api.get('/restaurant/location/-74.0059413,40.7127837');
    return result;
}

export function Tags (){
    const result = api.get('/tags');
    return result;
}

export function UpdateRestInfo (newData){
    const result = api.post('/restaurant',newData);
    return result;
}

