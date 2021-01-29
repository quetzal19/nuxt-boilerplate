// eslint-disable-next-line func-names
export default function ({ $axios }) {
  $axios.onRequest(config => {
    if ((process.server && process.env.STATUS) || process.server) {
      // eslint-disable-next-line no-console
      console.log(`Улетел запрос на: ${config.url}`);
    }
  });
  $axios.onError(e => {
    let text = 'Неизвестная ошибка';
    const { response, message } = e;
    if (response && response.data && response.data.error && response.data.error.message) {
      text = response.data.error.message;
    } else if (message) {
      text = message;
    }
    if ((process.server && process.env.STATUS) || process.server) {
      // eslint-disable-next-line no-console
      console.log(text);
    }
    if (!process.server && response.status !== 401) {
      // eslint-disable-next-line no-console
      console.log(text);
    }

    return Promise.reject(e);
  });
}
