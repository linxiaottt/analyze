import fetch from '../common/fetch';
import { STOCK } from '../common/constants';

export default {
    [STOCK.STOCK_INDEX_SEARCH.name] ({ commit }, payload) {
        const { type } = payload;
        const { path, method } = STOCK[type];
        fetch[method](path, { ...payload, commit });
    },
    [STOCK.STOCK_INDEX_TIMELINE.name] ({ commit }, payload) {
        const { type } = payload;
        const { path, method } = STOCK[type];
        fetch[method](path, { ...payload, commit });
    },
    [STOCK.STOCK_INDEX.name] ({ commit }, payload) {
        const { type } = payload;
        const { path, method } = STOCK[type];
        fetch[method](path, { ...payload, commit });
    },
    [STOCK.STOCK_REALTIME_K.name] ({ commit }, payload) {
        const { type } = payload;
        const { path, method } = STOCK[type];
        fetch[method](path, { ...payload, commit });
    },
    [STOCK.STOCK_TIMELINE.name] ({ commit }, payload) {
        const { type } = payload;
        const { path, method } = STOCK[type];
        fetch[method](path, { ...payload, commit });
    },
    [STOCK.STOCK_SZ_SH_STOCK_HISTORY.name] ({ commit }, payload) {
        const { type } = payload;
        const { path, method } = STOCK[type];
        fetch[method](path, { ...payload, commit });
    },
    [STOCK.STOCK_INDEX_K_LINE.name] ({ commit }, payload) {
        const { type } = payload;
        const { path, method } = STOCK[type];
        fetch[method](path, { ...payload, commit });
    },
    [STOCK.STOCK_REAL_STOCK_INFO.name] ({ commit }, payload) {
        const { type } = payload;
        const { path, method } = STOCK[type];
        fetch[method](path, { ...payload, commit });
    },
    [STOCK.STOCK_BATCH_REAL_STOCK_INFO.name] ({ commit }, payload) {
        const { type } = payload;
        const { path, method } = STOCK[type];
        fetch[method](path, { ...payload, commit });
    },
    [STOCK.STOCK_NAME_TO_STOCK_INFO.name] ({ commit }, payload) {
        const { type } = payload;
        const { path, method } = STOCK[type];
        fetch[method](path, { ...payload, commit });
    },
    [STOCK.STOCK_LIST.name] ({ commit }, payload) {
        const { type } = payload;
        const { path, method } = STOCK[type];
        fetch[method](path, { ...payload, commit });
    },
    [STOCK.STOCK_EVERY_TRADE.name] ({ commit }, payload) {
        const { type } = payload;
        const { path, method } = STOCK[type];
        fetch[method](path, { ...payload, commit });
    },
};
