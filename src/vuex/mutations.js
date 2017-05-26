import { STOCK, USER, COLLECTION } from '../common/constants';

export default {
    [STOCK.STOCK_INDEX_SEARCH.name] (state, payload) {
    	console.log(payload);
        const data = payload.showapi_res_body;
        const { contentlist: contentList } = data;

        delete data.contentlist;

        for (const key in data) { contentList[key] = data[key]; }
        state.indexListSearch = contentList;
    },
    [STOCK.STOCK_INDEX_TIMELINE.name] (state, payload) {
        const data = payload.showapi_res_body;
        const { dataList } = data;

        delete data.dataList;

        for (const key in data) { dataList[key] = data[key]; }
        state.indexTimeLine = dataList;
    },
    [STOCK.STOCK_INDEX.name] (state, payload) {
        const data = payload.showapi_res_body;
        const { indexList } = data;
        state.indexList = indexList;
    },
    [STOCK.STOCK_REALTIME_K.name] (state, payload) {
        const data = payload.showapi_res_body;
        const { dataList } = data;

        delete data.dataList;

        for (const key in data) { dataList[key] = data[key]; }
        state.realTimeK = dataList;
    },
    [STOCK.STOCK_TIMELINE.name] (state, payload) {
        const data = payload.showapi_res_body;
        const { dataList } = data;

        delete data.dataList;

        for (const key in data) { dataList[key] = data[key]; }
        state.timeline = dataList;
    },
    [STOCK.STOCK_SZ_SH_STOCK_HISTORY.name] (state, payload) {
        const data = payload.showapi_res_body;
        const { list } = data;

        delete data.list;

        for (const key in data) { list[key] = data[key]; }
        state.history = list;
    },
    [STOCK.STOCK_INDEX_K_LINE.name] (state, payload) {
        const data = payload.showapi_res_body;
        const { dataList } = data;

        delete data.dataList;

        for (const key in data) { dataList[key] = data[key]; }
        state.kLine = dataList;
    },
    [STOCK.STOCK_REAL_STOCK_INFO.name] (state, payload) {
        const data = payload.showapi_res_body;
        const { stockMarket } = data;
        state.realStockInfo = stockMarket;
    },
    [STOCK.STOCK_BATCH_REAL_STOCK_INFO.name] (state, payload) {
        const data = payload.showapi_res_body;
        const { list } = data;

        delete data.list;

        for (const key in data) { list[key] = data[key]; }
        state.batchRealStockInfo = list;
    },
    [STOCK.STOCK_NAME_TO_STOCK_INFO.name] (state, payload) {
        const data = payload.showapi_res_body;
        const { list } = data;


        delete data.list;

        for (const key in data) { list[key] = data[key]; }

        state.nameToStockInfo = list;
    },
    [STOCK.STOCK_LIST.name] (state, payload) {
        const data = payload.showapi_res_body;
        const { contentlist: contentList } = data;

        delete data.contentlist;

        for (const key in data) { contentList[key] = data[key]; }
        state.stockList = contentList;
    },
    [STOCK.STOCK_EVERY_TRADE.name] (state, payload) {
        const data = payload.showapi_res_body;
        const { list } = data;

        delete data.list;

        for (const key in data) { list[key] = data[key]; }
        state.recentTrade = list;
    },
    [STOCK.STOCK_NEWS.name] (state, payload) {
    	const { data } = payload;
    	state.stockNews = data.data;
    },
    [USER.USER_REGISTER.name] (state, payload) {
    	const { data } = payload;
    	state.userInfo = data;
    },
    [USER.USER_LOGIN.name] (state, payload) {
    	const { data } = payload;
    	state.userInfo = data;
    },
    [USER.USER_LOGOUT.name] (state, payload) {
    	state.userInfo = {};
    },
    [USER.USER_GET_MY_INFO.name] (state, payload) {
    	const { data } = payload;
    	state.userInfo = data;
    },
    [COLLECTION.COLLECTION_COLLECT.name] (state, payload) {
    	const { data } = payload;
    },
    [COLLECTION.COLLECTION_UNCOLLECT.name] (state, payload) {
    	const { data } = payload;
    },
    [COLLECTION.COLLECTION_GET_COLLECTED.name] (state, payload) {
    	const { data } = payload;
    	state.collectionTable = data;
    },
    [COLLECTION.COLLECTION_HAS_COLLECTED.name] (state, payload) {
    	const { data } = payload;

    }
};

