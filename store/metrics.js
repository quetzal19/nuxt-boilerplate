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
    console.log(`Счётчик яндекс метрики: ${process.env.YANDEX_METRICA}`);
    commit('setModuleStatus', { module: 'yandexMetrica', status: true });
  },

  initGtm({ commit }) {
    console.log(`Счётчик GTM: ${process.env.GTM}`);
    commit('setModuleStatus', { module: 'gtm', status: true });
  },

  initGoogleAnalytics({ commit }) {
    console.log(`Счётчик гугл аналитики: ${process.env.GOOGLE_ANALYTICS}`);
    commit('setModuleStatus', { module: 'googleAnalytics', status: true });
  },
};
