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

export function FoodList (data){
    const result = api.get(`/food?restaurantId=${data.id}&page=${data.page}&limit=${data.limit}&keyword=${data.keyword}`);
    return result;
}

export function UpdataFoodList (newData){
    const result = api.post('/food',newData);
    return result;
}