export default function (store) {
  const { og } = store.state.detailPage.params.data.metaParams;
  const { host } = store.state;

  if (og) {
    return {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: og['og:title'],
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: og['og:description'],
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${host}${og['og:image']}`,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${host}${og['og:url']}`,
        },
      ],
    };
  }

  return {
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no',
      },
    ],
  };
}
