export const state = () => ({
  photo: '',
});

export const mutations = {
  // eslint-disable-next-line no-shadow
  SET_PHOTO(state, payload) {
    state.photo = payload;
  },
};
export const actions = {
  FETCH_PHOTO({ commit }) {
    try {
      const response = this.$axios.$get('https://jsonplaceholder.typicode.com/photos/1');
      commit('SET_PHOTO', response.data);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },
};
