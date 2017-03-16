import { STOCK } from '../common/constants';

export default {
    [STOCK.STOCK_INDEX_SEARCH.name] (state, payload) {
        console.log(payload, 'xxxx');
        const { contentList } = payload;
        delete payload.contentList;
        for (const key in payload) {
            contentList[key] = payload[key];
        }
        state.indexListSearch = payload.contentList;
    },
    [STOCK.STOCK_INDEX_TIMELINE.name] (state, payload) {},
    [STOCK.STOCK_INDEX.name] (state, payload) {},
    [STOCK.STOCK_REALTIME_K.name] (state, payload) {},
    [STOCK.STOCK_TIMELINE.name] (state, payload) {},
    [STOCK.STOCK_SZ_SH_STOCK_HISTORY.name] (state, payload) {},
    [STOCK.STOCK_INDEX_K_LINE.name] (state, payload) {},
    [STOCK.STOCK_REAL_STOCK_INFO.name] (state, payload) {},
    [STOCK.STOCK_BATCH_REAL_STOCK_INFO.name] (state, payload) {},
    [STOCK.STOCK_NAME_TO_STOCK_INFO.name] (state, payload) {},
    [STOCK.STOCK_LIST.name] (state, payload) {},
    [STOCK.STOCK_EVERY_TRADE.name] (state, payload) {},
};

