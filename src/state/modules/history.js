import $player_api from "../player-api";
import $cookies from "vue-cookies";
// import store from '@/state/store'
export const state = {
    token: $cookies.get("token"),
    data: {
        list: [],
        links: [],
        current_page: 0,
        last_page: 0,
        per_page: 0,
        total: 0,
    },
};

export const actions = {
	betList({rootGetters, dispatch }, pl) {
		return new Promise(function (resolve) {
			$player_api
				.get(`games?` + new URLSearchParams(pl).toString(), {
					headers: {
						Authorization: rootGetters["auth/bearer_token"],
					},
				})
				.then(function (res) {
					if (res.status == 200) {
						resolve(res.data.data);
					}
				})
				.catch(function (err) {
					if (err.response.status == 401) {
						dispatch("auth/logoutUser", {}, { root: true }).then(() => { });
					}
				});
		});
	},
};

export const mutations = {
    setData(state, data) {
        state.data.list = data.data;
        state.data.links = data.links;
        state.data.current_page = data.current_page;
        state.data.last_page = data.last_page;
        state.data.per_page = data.per_page;
        state.data.total = data.total;
    },

    clearData(state) {
        state.data.list = [];
        state.data.links = [];
        state.data.current_page = 0;
        state.data.last_page = 0;
        state.data.per_page = 0;
        state.data.total = 0;
    },
};

export const getters = {};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};
