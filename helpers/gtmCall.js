export default function (store, pageOptions) {
  const dataLayer = window.dataLayer || [];
  const { isAuthorized } = store.state.user;
  const { id } = store.state.user.personal.data;
  const options = {
    userAuth: +isAuthorized,
  };

  if (id) {
    options.userId = id;
  }

  dataLayer.push({
    ...options,
    ...pageOptions,
  });
}
