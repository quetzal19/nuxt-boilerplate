/* eslint-disable no-shadow */

export const state = () => ({
  yandexMetrica: {
    enabled: false,
  },
  gtm: {
    enabled: false,
  },
  googleAnalytics: {
    enabled: false,
  },
});

export const mutations = {
  setModuleStatus(state, { module, status }) {
    state[module].enabled = status;
  },
};

export const actions = {
  initMetrika({ commit }) {
    commit('setModuleStatus', { module: 'yandexMetrica', status: true });
  },

  initGtm({ commit }) {
    commit('setModuleStatus', { module: 'gtm', status: true });
  },

  initGoogleAnalytics({ commit }) {
    commit('setModuleStatus', { module: 'googleAnalytics', status: true });
  },
};
