import Vue from 'vue';
import Vuex from 'vuex';
import StaffType from '@/components/models/StaffInterface';
import StaffApi from './api/StaffApi';

Vue.use(Vuex);

export const state = {
  items: [] as StaffType[],
};

export const mutations = {
  set: (s: any, payload: StaffType[]) => {
    s.items = payload;
  },
  reset: (s: any) => {
    s.items = [];
  },
};

export const actions = {
  fetch: async ( context: any, searchStrings: string): Promise<any> => {
    const res = await StaffApi.search( searchStrings );
    context.commit('set', res);
  },
  delete: async ( _: any, idList: string[]): Promise<any> => {
    const res = await StaffApi.delete( idList );
    return res;
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
});
