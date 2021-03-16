/* eslint-disable no-param-reassign */

/**
 * Хелпер метод который реализовывает в себе весь необходимый функционал для фиксированных блоков с треком.
 * Для работы в вызываемом комоненте необходимо создать в data параметр fixedStyles и привязать эти стили к контейнеру.
 * 1. Привязывается вот таким образом - :style="[fixedStyles]"
 * 2. У контейнера должен быть стилизован нужный трек чтобы контейнеру было место для движения
 * 3. В вёрстке нужно разметить с помощью айдишников трек и контейнер
 * 4. Вёрстка должны быть готова к тому что контейнер будет фиксированным
 * @param { Object } context - контекст vue компонента(this) для привязки fixedStyles
 * @param { Number } topGap - Отступ сверху при фиксации контейнера
 * @param { Number } bottomGap - Отступ снизу при фиксации контейнера
 * @param { Number } bottomMargin - Не обязательный параметр. Используется чтобы убрать лишнее место внизу трека
 * @param { String } trackId - id элемента являющегося треком
 * @param { String } containerId - id элемента являющегося контейнером
 */

export default ({
  context,
  topGap,
  bottomGap,
  bottomMargin = 0,
  trackId,
  containerId,
}) => {
  const track = document.getElementById(trackId).getBoundingClientRect(); // Координаты трека
  const container = document.getElementById(containerId).getBoundingClientRect(); // Координаты контейнера
  const windowHeight = window.innerHeight; // Высота окна браузера
  const containerHeight = container.height; // Высота контейнера
  const lastKnownScroll = window.scrollY || window.pageYOffset; // Значение scrollY для окна браузера

  document.getElementById(trackId).style.position = 'relative'; // У трека обязательно должен быть этот стиль

  // Определяем направление скролла
  if (context.lastKnownScroll < lastKnownScroll) context.scrollDirection = 'bottom';
  else context.scrollDirection = 'top';
  context.lastKnownScroll = lastKnownScroll;

  // Определяем больше ли контейнер своего трека, а также ставим mode
  const isContainerBiggerThanWindow = containerHeight > windowHeight;
  let mode = 'top'; // Какая граница должны быть всегда видна. top - всегда видна верхняя граница bottom - нижняя
  if (isContainerBiggerThanWindow && context.scrollDirection === 'bottom') {
    mode = 'bottom';
  } else if (isContainerBiggerThanWindow && context.scrollDirection === 'top') {
    mode = 'top';
  } else if (!isContainerBiggerThanWindow) {
    mode = 'top';
  }

  // Определяем зашёл ли контейнер за нижнюю границу
  const isContainerOverflowTrack = track.bottom - bottomMargin <= container.bottom;

  // Определяем достаточно ли мы проскролили вниз от верха, чтобы включать фиксацию
  let enableFixed = false;
  if (track.top <= topGap) enableFixed = true;

  // Включение фикседа в режиме mode === top
  if (enableFixed && mode === 'top') {
    if (
      (!isContainerOverflowTrack && context.scrollDirection === 'bottom')
      || (context.scrollDirection === 'top' && container.top >= topGap)
    ) {
      context.fixedStyles = {
        position: 'fixed',
        top: `${topGap}px`,
      };
    }
  }

  // Включение фикседа в режиме mode === bottom
  if (enableFixed && mode === 'bottom') {
    if (
      !isContainerOverflowTrack
      && context.scrollDirection === 'bottom'
      && windowHeight > container.bottom + bottomMargin
    ) {
      context.fixedStyles = {
        position: 'fixed',
        top: 'auto',
        bottom: `${bottomGap}px`,
      };
    }
  }

  // Фиксируем при достижении низа
  if (isContainerOverflowTrack && ((context.scrollDirection === 'bottom' && mode === 'top')
    || (mode === 'bottom' && container.bottom < windowHeight))) {
    context.fixedStyles = {
      position: 'absolute',
      top: 'auto',
      bottom: `${bottomGap}px`,
    };
  }

  // Обрабатываем ситуацию когда посреди скролла мы вдруг меняем направление
  const isAtBottom = context.fixedStyles && context.fixedStyles.position && context.fixedStyles.position === 'absolute';
  if (isContainerBiggerThanWindow && enableFixed && isAtBottom === false) {
    if (
      (mode === 'top' && context.fixedStyles && context.fixedStyles.top && context.fixedStyles.top === 'auto')
      || (mode === 'bottom' && context.fixedStyles && context.fixedStyles.top && context.fixedStyles.top !== 'auto')
    ) {
      context.fixedStyles = {
        position: 'absolute',
        top: 'auto',
        bottom: `${track.bottom - container.bottom}px`,
      };
    }
  }

  // Сброс фикседа
  if (!enableFixed) {
    context.fixedStyles = '';
  }
};
