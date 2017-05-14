import fetch from '../common/fetch';
import { STOCK, USER } from '../common/constants';

export default {
    [STOCK.STOCK_INDEX_SEARCH.name] ({ commit }, payload) {
        const { type } = payload;
        const { path, method } = STOCK[type];
        fetch(path, { ...payload, commit, method });
    },
    [STOCK.STOCK_INDEX_TIMELINE.name] ({ commit }, payload) {
        const { type } = payload;
        const { path, method } = STOCK[type];
        fetch(path, { ...payload, commit, method });
    },
    [STOCK.STOCK_INDEX.name] ({ commit }, payload) {
        const { type } = payload;
        const { path, method } = STOCK[type];
        fetch(path, { ...payload, commit, method });
    },
    [STOCK.STOCK_REALTIME_K.name] ({ commit }, payload) {
        const { type } = payload;
        const { path, method } = STOCK[type];
        fetch(path, { ...payload, commit, method });
    },
    [STOCK.STOCK_TIMELINE.name] ({ commit }, payload) {
        const { type } = payload;
        const { path, method } = STOCK[type];
        fetch(path, { ...payload, commit, method });
    },
    [STOCK.STOCK_SZ_SH_STOCK_HISTORY.name] ({ commit }, payload) {
        const { type } = payload;
        const { path, method } = STOCK[type];
        fetch(path, { ...payload, commit, method });
    },
    [STOCK.STOCK_INDEX_K_LINE.name] ({ commit }, payload) {
        const { type } = payload;
        const { path, method } = STOCK[type];
        fetch(path, { ...payload, commit, method });
    },
    [STOCK.STOCK_REAL_STOCK_INFO.name] ({ commit }, payload) {
        const { type } = payload;
        const { path, method } = STOCK[type];
        fetch(path, { ...payload, commit, method });
    },
    [STOCK.STOCK_BATCH_REAL_STOCK_INFO.name] ({ commit }, payload) {
        const { type } = payload;
        const { path, method } = STOCK[type];
        fetch(path, { ...payload, commit, method });
    },
    [STOCK.STOCK_NAME_TO_STOCK_INFO.name] ({ commit }, payload) {
        const { type } = payload;
        const { path, method } = STOCK[type];
        fetch(path, { ...payload, commit, method });
    },
    [STOCK.STOCK_LIST.name] ({ commit }, payload) {
        const { type } = payload;
        const { path, method } = STOCK[type];
        fetch(path, { ...payload, commit, method });
    },
    [STOCK.STOCK_EVERY_TRADE.name] ({ commit }, payload) {
        const { type } = payload;
        const { path, method } = STOCK[type];
        fetch(path, { ...payload, commit, method });
    },
    [USER.USER_REGISTER.name] ({ commit }, payload) {
		const { type } = payload;
		const { path, method } = USER[type];
		fetch(path, { ...payload, commit, method });
	},
	[USER.USER_LOGIN.name] ({ commit }, payload) {
		const { type } = payload;
		const { path, method } = USER[type];
		fetch(path, { ...payload, commit, method });
	},
	[USER.USER_LOGOUT.name] ({ commit }, payload) {
		const { type } = payload;
		const { path, method } = USER[type];
		fetch(path, { ...payload, commit, method });
	},
	[USER.USER_GET_MY_INFO.name] ({ commit }, payload) {
		const { type } = payload;
		const { path, method,  } = USER[type];
		fetch(path, { commit, method, type });
	}
};
