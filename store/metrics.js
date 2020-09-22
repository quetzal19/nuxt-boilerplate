/* eslint-disable no-shadow */

/**
 * @module store/metrics
 * @desc Модуль для работы с аналитикой. Настроен для Яндекс Метрики, gtm, ga
 */

export const state = () => ({
  yandexMetrica: {
    id: '',
    enabled: false,
  },
  gtm: {
    id: '',
    enabled: false,
  },
  googleAnalytics: {
    id: '',
    enabled: false,
  },
});

export const mutations = {
  setModuleStatus(state, { module, status, id }) {
    state[module].enabled = status;
    state[module].id = id;
  },
};

export const actions = {
  initMetrika({ commit }, id) {
    commit('setModuleStatus', { module: 'yandexMetrica', status: true, id });
  },

  initGtm({ commit }, id) {
    commit('setModuleStatus', { module: 'gtm', status: true, id });
  },

  initGoogleAnalytics({ commit }, id) {
    commit('setModuleStatus', { module: 'googleAnalytics', status: true, id });
  },

  /**
   * Отправка события для любой из 3х систем отслеживания
   * @param state { Object } - Состояние данного модуля vuex
   * @param type { "ym"|"gtm"|"ga" }
   * @param eventName { String } - Название события
   * @param options { Array.<String>|Array.<Object> } - Дополнительные опции для гугл аналитики
   */
  sendEvent({ state }, { type, eventName, options }) {
    if (state.gtm.enabled && type === 'gtm') {
      this.$gtag('event', eventName, {
        ...options,
        event_category: eventName,
        page_path: '',
      });
    }

    if (state.yandexMetrica.enabled && type === 'ym') {
      this.$ym(+state.yandexMetrica.id, 'reachGoal', eventName, ...options);
    }

    if (state.googleAnalytics.enabled && type === 'ga' && options) {
      this.$ga.event(eventName, ...options);
    }
  },

  /**
   * @desc Функция для отправки события ЭТ через Гугл Аналитику
   * @param ctx { Object } - Контекст накста
   * @param transactionOptions - Опции для транзакции
   * @param itemOptions - Опции для торгового айтема
   */
  sendAnalyticsECommerce(ctx, { transactionOptions, itemOptions }) {
    const id = +new Date();
    this.$ga.ecommerce.addTransaction({
      id,
      ...transactionOptions,
    });

    this.$ga.ecommerce.addItem({
      id,
      ...itemOptions,
    });

    this.$ga.ecommerce.send();
  },
};
