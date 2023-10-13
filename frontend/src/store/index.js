import { createStore } from 'vuex';

export default createStore({
    state: {
        isDarkMode: false,
    },
    mutations: {
        TOGGLE_DARK_MODE(state) {
            state.isDarkMode = !state.isDarkMode;
        },
    },
    actions: {
        toggleDarkMode({ commit }) {
            commit('TOGGLE_DARK_MODE');
        },
    },
    getters: {
        isDarkMode: state => state.isDarkMode,
    },
});