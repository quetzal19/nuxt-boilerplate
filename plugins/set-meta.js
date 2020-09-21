/* eslint-disable */
import Vue from 'vue';

/**
 * @module plugins/set-meta
 * @desc Плагин добавляет в Nuxt 2 метода для работы с SEO тегами
 * @param context { Object } - Стандартный объект контекста Nuxt
 */

export default (context) => {
  /**
   * Генерация seo тегов без доп операций
   * @param store
   * @param seo
   */
  const setMeta = (store, seo) => {
    const {
      title,
      description,
      video,
      url,
    } = seo;

    let host = '';
    if (store && store.state && store.state.host) host = store.state.host;

    return setHead(title, description, video, url, host);
  };


  /**
   * Генерация seo тегов с дефолтным description
   * @param store
   * @param seo
   * @param locale
   */
  const setDefaultMeta = (store, seo, locale) => {
    const {video, url} = seo;

    let host = '';
    if (store && store.state && store.state.host) host = store.state.host;

    let title = '';
    let description = '';

    // Код ниже работает только при установленном i18n!
    if (locale) {
      if (locale === 'ru') {
        title = `${seo.title}: Дефолтное дополнение к тайтлу с i18n`;
        description = `${seo.title}. Дефолтная генерация описания с i18n`;
      }
    } else {
      title = `${seo.title}: Дефолтное дополнение к тайтлу без i18n`;
      description = `${seo.title}. Дефолтная генерация описания без i18n`;
    }

    return setHead(title, description, video, url, host);
  };

  /**
   * Генерация объекта тегов для применения в head.
   * Вызывается функциями setMeta и setDefaultMeta
   * в которых могут дополнительно обрабатыватся параметры
   * @param title
   * @param description
   * @param video
   * @param url
   * @param host
   */
  function setHead(title, description, video, url, host) {
    let locale = '';
    if (context.store) locale = context.store.$i18n && context.store.$i18n.locale || '';

    const head = {
      title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'description',
          property: 'description',
          content: description,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website',
        },
        {
          hid: 'vk:image',
          property: 'vk:image',
          content: `${host}/img/open-graph/og_${locale}.png`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${host}/img/open-graph/og_${locale}.png`,
        },
      ],
    };

    if (host) {
      head.meta.push({
        hid: 'vk:image',
        property: 'vk:image',
        content: `${host}/img/open-graph/og_${locale}.png`,
      });
      head.meta.push({
        hid: 'og:image',
        property: 'og:image',
        content: `${host}/img/open-graph/og_${locale}.png`,
      })
    }

    if (video) {
      head.meta.push({
        hid: 'og:video',
        property: 'og:video',
        content: video,
      });
    }

    if (url) {
      head.meta.push({
        hid: 'og:url',
        property: 'og:url',
        content: `${host}${url}`,
      });
    }

    if (locale) {
      head.link = setLangLink(host);
    }

    return head;
  }

  /**
   * Генерация тега alternate для разных языков **ЕСЛИ УСТАНОВЛЕН i18n**
   * @param host {String} - Корневой адрес для тега
   */
  function setLangLink(host) {
    return [
      {
        rel: 'alternate',
        hreflang: 'en',
        href: `${host}${context.app.switchLocalePath('en')}`,
      },
      {
        rel: 'alternate',
        hreflang: 'ru',
        href: `${host}${context.app.switchLocalePath('ru')}`,
      },
    ];
  }

  Vue.prototype.$setMeta = setMeta;
  Vue.prototype.$setDefaultMeta = setDefaultMeta;
};
