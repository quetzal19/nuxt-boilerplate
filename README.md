## Полезные ссылки
- [Базовый синтаксис .md файлов](https://www.markdownguide.org/basic-syntax/)
- [Официальная документация NuxtJs](https://nuxt.com).
- [Официальная документация VueJs 3x](https://vuejs.org/)
- [Официальная документация pinia](https://pinia.vuejs.org/)

## Основная информация:
- Проект написан на Nuxt3 (в базе Vue3).<br>
- [Общие правила разработки](https://www.notion.so/panfilovdigital/bcbb70330a3c40bbb0b14087e467c8d7#3e29d1d8c4114cd4b6a7cf71487b1e11) (в целом для компании, и для этого проекта в частности).
- [Регламент работы с GIT](https://www.notion.so/panfilovdigital/git-73acb9b539dd4c8ca91d4bf86d8bc369#fda11011118542598b7ed02ae092dce2).
- В качестве пакетного менеджера, используется [Yarn](https://yarnpkg.com/). NPM пользоваться запрещено. Если, вдруг, в коммитах проскальзывает `package-lock.json` и меняется форматирование `yarn.lock` без видимых на то причин (без смены версий). Следует обраться к тимлиду, так как это значит, что использовался менеджер npm и есть риск создания параллельных деревьев зависимостей.

- Основные библиотеки:
  - верстка темплейтов на HTML
  - стили scoped на SCSS
  - проект использует только TS
  - Дополнительную информацию про используемые либы и их версионность можно посмотреть в разделе зависимостей в `package.json`

## Алгоритм раскатки проекта

1. Скопировать репу
2. Команда `yarn` чтобы установить все зависимости
3. Запустить `nuxt dev`

## Директории проекта
- `assets` - директория с разными вспомогательными файлами(иконки свг и стили).
- `assets/ico` - ПОКА СПРАЙТ НЕ РЕАЛЗИОВАН. иконки для спрайта. Все иконки в этой категории доступны для импорта в проект через тег <app-icon>.
- `assets/scss` - отдельный файлы стилей, которые импортируются в проект глобально. Содержит, например, типографику, миксины для разных устройств и стили для глобальных компонентов(например модалок)
<br>
<br>
- `components` - директория с компонентами.
- `components/common` - специфические компоненты, содержащие контент/логику, но которые используются по всему проекту. Например, компонент кнопки.
- `components/general` - компоненты-обертки, которые могут использоваться везде по проекту. Не содержат специфической для проекта логики. Через них, например, используются компоненты из element-ui или swiper.js. Импортируются глобально - это единственные компоненты, которые не требуют импорта в другие компоненты, но доступны везде по умолчанию.
- `components/views` - директория с основной массой компонентов страниц. Может содержать только папки, соответствующие роуту страницы + footer/header. Например, все комопненты со страницы поиска должны лежать в папке `views/search`. Далее в глубину ветвление ограничено только здравым смыслом.
- `helpers` - директория с функциями-помощниками. Есть более универсальные - они лежат просто в категории. Более специализированные рассортированы по папкам. Новые функции добавляются с одобрения тимлида, чтобы избежать дублирования уже написанного.
- `layouts` - директория с лейаутами. Далеко не каждой странице требуется отдельный лейаут. По умолчанию используется default лейаут.
- `middleware` - директория с вынесенными отдельно middleware файлами. Если добавить такой middleware на страницу, то он отработает до того, как страница начнет рендериться. Добавление middleware в эту директорию (а не прописывание ее в самом компоненте страницы требует веских причин. Например, она должна переиспользоваться или содержать такой объем логики, что его легче держать отдельно). Новые файлы пишутся на TS. Старые на JS будут постепенно переведены на TS.
- `mixins` - директория с миксинами. Новый миксин добавляется когда необходимо выделить в отдельный файл (для переиспользования) некоторую логику. Ключевое отличие от хелперов в том, что здесь доступен весь интерфейс компонента, включая хуки. По сути любой компонент, которому передать миксин, получит и его переменные и методы и действия в хуках.
- `mock` - здесь храняться файлы с расширением `.json`, которые содержат статичные данные. Например, меню для футера. Или фейковые данные, которые могут использоваться до готовности бекенда. (Сейчас работы до готовности бекенда являются bad practice, но могут применяться в качестве исключения)
- `modules` - директория для модулей. Вообще модули(интегрирующиеся либы для расширения кор-фукцнионала накста) подключаются в `nuxt.config.js`. Но когда нужна их работа не из коробки(или вообще что-то самописное), то настройки(или код) кладется сюда.
- `node_modules` - сюда ставятся все либы после команды `yarn`. Генерируется автоматически.
- `pages` - директория с компонентами страниц. Согласно неймингу и структуре, роутер формирует урлы проекта.
  <br>
  <br>
- `plugins` - директория с плагинами. Это файлы, которые запускаются до создания экземпляра корневого приложения Vue.js. Плагины без поддиректории(`client`/`server`) будут работать и на клиенте, и на сервере. Нужно не забыть после добавления нового плагина, прописать его в `nuxt.config.js`
- `plugins/client` - плагины, которые будут работать только на клиенте.
- `plugins/prototypes` - здесь пишутся расширения для стандартных прототипов JS.
- `plugins/server` - плагины, которые будут работать только на сервере.
- `public` - директория для хранения статичных файлов. В основном, это разные картинки(тут, также, как и в директории `assets/ico` может лежать `.svg` графика, если ее не нужно вставлять в спрайт). Также здесь могут храниться документы.

## Основные правила проекта
Из каждого приведенного ниже правила могут быть исключения (иначе разработчики не были бы нужны), но они должны быть осознанными и преследовать определенную цель. Стоит несколько раз взвесить за и против. А в идеале еще и обсудить с более опытным разработчиком.

* Цвета использовать только из variables ниже 60 строки. Если не хватает цвета, то можно его добавить. Если не знаешь или сомневаешься как, то напиши тимлиду.
* Все настройки шрифтов получать только через миксин `get_typography`. Без него только с разрешения тимлида (и то не стоит).
* По возможности во всех функциях следует пользоваться деструкцией аргументов. Например, вместо `func(arg1, arg2)` следует писать `func({arg1, arg2})`. Это современный формат, который упрощает взаимодействие с аргументами. Например, не требуется соблюдать очередность аргументов.
* В директорию `assets/ico` `svg-файл` должен добавляться только если такого до этого там не было и если нужно как-то влиять на него через `css`. В противном случае следует добавлять его в директорию `static/icons`
* Если понадобилось добавить `svg-файл` в директорию `assets/ico`, следует обязательно задать для нее свойство `fill="currentColor"`. Можно подсмотреть как это делается в других `svg-файлах`
* Любые махинации с `shadow-root` (обычно случай со стилизацией `iframe`) должны предотвращаться в зародыше. Ничего хорошего из этого не выйдет
* Если хочешь использовать `watcher` в компоненте, то подумай дополнительный десяток раз. Есть случаи, когда он нужен, но в большинстве случаев, он - признак костыля и можно решить проблему проще и более читаемо.
* `Flex-flow` много раз вызывал визуальные баги, лучше его не использовать
* Не забываем писать документацию в каждом новом компоненте. А при изменении старого, обновлять имеющуюся документацию.
* По возможности использовать прерывание функции([статья с примерами](https://medium.com/swlh/return-early-pattern-3d18a41bba8)). Исключения конечно есть, но должны быть осознанными.
* В `scss` стили для разных устройств должны быть разными блоками. Сначала идет блок стилей с классом компонента. Потом миксин адаптива. Использование миксина устройства внутри блока стилей запрещается. Такой миксин может идти только первым уровнем вложенности.
     ```scss
        // так нельзя:
        .class-name {
          @include tablet() {}
        }
        // так можно:
        .class-name {
        }
        @include tablet() {
          .class-name {}
        }
    ```
* Не делать вложенность `scss` больше трех. `scss` !== `html` и далеко не обязательно повторять вложенность верстки в стилях. Как правило, понадобится блок с классом компонента, а в нем уже плоская вложенность. Можно добавить дополнительный уровень, если, например, в компоненте разные однотипные блоки с одинаковыми элементами(например, `title`, `description`). Но это скорее исключение чем правило. Стоит попробовать подобный подход и стили заиграют новыми красками.
* Стили для класса не должны дробиться. Они идут цельным блоком. Если потом есть вложенный класс, то после него стили класса-родителя не допустимы.
    ```scss
    // так нельзя:
    .class-name {
      display: flex;
      .class-name2 {
        display: block;
      }
      color: black;
    }
    // так можно:
    .class-name {
      display: flex;
      color: black;
      .class-name2 {
        display: block;
      }
    }
    ```
