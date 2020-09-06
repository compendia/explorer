/* tslint:disable:no-shadowed-variable */
import * as types from "../mutation-types";
import { IStorePayload, ICustomStoreState } from "../../interfaces";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";

const namespaced = true;
const state: ICustomStoreState = {
  supply: null,
  removed: "0",
  staked: "0",
  stakePower: "0",
  stakes: null,
};

const actions: ActionTree<ICustomStoreState, {}> = {
  setSupply: ({ commit }, value) => {
    commit({
      type: types.SET_CUSTOM_SUPPLY,
      value,
    });
  },
  setRemoved: ({ commit }, value) => {
    commit({
      type: types.SET_CUSTOM_REMOVED,
      value,
    });
  },
  setStaked: ({ commit }, value) => {
    commit({
      type: types.SET_CUSTOM_STAKED,
      value,
    });
  },
  setStakePower: ({ commit }, value) => {
    commit({
      type: types.SET_CUSTOM_STAKE_POWER,
      value,
    });
  },
};

const mutations: MutationTree<ICustomStoreState> = {
  [types.SET_CUSTOM_SUPPLY](state, payload: IStorePayload) {
    state.supply = payload.value;
  },
  [types.SET_CUSTOM_REMOVED](state, payload: IStorePayload) {
    state.removed = payload.value;
  },
  [types.SET_CUSTOM_STAKED](state, payload: IStorePayload) {
    state.staked = payload.value;
  },
  [types.SET_CUSTOM_STAKE_POWER](state, payload: IStorePayload) {
    state.stakePower = payload.value;
  },
};

const getters: GetterTree<ICustomStoreState, {}> = {
  supply: (state) => state.supply,
  removed: (state) => state.removed,
  staked: (state) => state.staked,
  stakePower: (state) => state.stakePower,
};

export const custom: Module<ICustomStoreState, {}> = {
  namespaced,
  state,
  actions,
  mutations,
  getters,
};
