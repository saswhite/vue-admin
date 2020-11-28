import Vue from 'vue';
import Vuex from 'vuex';

/* components */
import modal from './modal/index';

/* pages */
import rest from './rest/index';
import menu from './menu/index';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        modal,
        rest,
        menu
    }
});
