/*eslint-disable */

export default class {
  constructor($c) {
    this.el = $c[0] ? $c[0] : $c;

    const type = this.el.getAttribute('data-type');

    this.swiper = new Swiper(this.el, this.getParameters(type));
  }

  getParameters(type) {
    const parameters = {
      pagination: {
        el: this.el.querySelector('.js-slider-pagination'),
        bulletClass: 'bullet',
        bulletActiveClass: '_active',
      },
      noSwipingClass: 'js-slider-no-swiping',
    };

    switch (type) {
      case 'example-slider':
        Object.assign(parameters, {
          slidesPerView: 1,
          effect: 'fade',
          fadeEffect: {
            crossFade: true,
          },
          autoHeight: true,
          navigation: {
            prevEl: this.el.parentNode.querySelector('.prev'),
            nextEl: this.el.parentNode.querySelector('.next'),
          },
        });
        break;

      default:
    }

    return parameters;
  }
}
