/* eslint-disable no-use-before-define */
/**
 * @module store/index
 * @desc Корневой модуль vuex
 */

export const actions = {
  /**
   * Функция запускающаяся на сервере при рендере
   * @param context { Object } - Стандартный контекст nuxt
   */
  nuxtServerInit({ dispatch }) {
    initMetrics(dispatch);
  },
};

/**
 * Инициализация счётчиков аналитики в зависимости
 * от переданных номеров в .env
 * @param dispatch { Function } - Функция необходимая для вызова экшенов из других модулей
 */
function initMetrics(dispatch) {
  if (process.env.GTM) {
    dispatch('metrics/initGtm', process.env.GTM);
  } else if (process.env.GOOGLE_ANALYTICS) {
    dispatch('metrics/initGoogleAnalytics', process.env.GOOGLE_ANALYTICS);
  }
  if (process.env.YANDEX_METRICA) {
    dispatch('metrics/initMetrika', process.env.YANDEX_METRICA);
  }
}
