// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
// Doc: https://github.com/AlexandreBonaventure/vue-mq
import VueMq from 'vue-mq';

export default function ({ $ua }) {
  const mapRules = {
    [$ua.isFromSmartphone()]: 'sm',
    [$ua.isFromTablet()]: 'md',
    [$ua.isFromPc()]: 'lg',
  };

  if (process.client) {
    Vue.use(VueMq, {
      breakpoints: {
        sm: 767,
        md: 1210,
        lg: Infinity,
      },
      defaultBreakpoint: mapRules.true,
    });
  }

  if (process.server) {
    Vue.prototype.$mq = mapRules.true;
  }
}
