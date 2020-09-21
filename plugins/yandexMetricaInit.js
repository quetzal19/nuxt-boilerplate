/* eslint-disable */
/**
 * @module plugins/yandexMetricaInit
 * @desc Код для активации яндекс метрики. Работает только если в .env
 * передали параметр YANDEX_METRICA
 */

export default (ctx, inject) => {
  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

  // Добавляем счётчик к body
  const noscript = document.createElement('noscript');
  const div = document.createElement('div');

  const img = document.createElement('img');
  img.setAttribute('src', 'https://mc.yandex.ru/watch/27241256');
  img.setAttribute('style', 'position:absolute; left:-9999px;');
  img.setAttribute('alt', '');

  div.appendChild(img);
  noscript.appendChild(div);
  document.body.prepend(noscript);

  // Активируем счётчик
  ym(process.env.YANDEX_METRICA, "init", {
    defer: true,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true
  });

  // Засекаем переходы по страницам сайта
  ctx.app.router.afterEach((to, from) => {
    if (window && window.ym) {
      window.ym(27241256, 'hit', to.fullPath);
    }
  });

  ctx.$ym = ym;
  inject('ym', ym);
};
