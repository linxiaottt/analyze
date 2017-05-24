export const STOCK = {
    // 股指列表查询
    "STOCK_INDEX_SEARCH": {
        "method": "GET",
        "name": "STOCK_INDEX_SEARCH",
        "path": "http://ali-stock.showapi.com/stockindexsearch"
    },
    // 股指实时分时线
    "STOCK_INDEX_TIMELINE": {
        "method": "GET",
        "name": "STOCK_INDEX_TIMELINE",
        "path": "http://ali-stock.showapi.com/index-timeline"
    },
    // 股指实时行情_批量
    "STOCK_INDEX": {
        "method": "GET",
        "name": "STOCK_INDEX",
        "path": "http://ali-stock.showapi.com/stockIndex"
    },
    // 股票实时K线数据
    "STOCK_REALTIME_K": {
        "method": "GET",
        "name": "STOCK_REALTIME_K",
        "path": "http://ali-stock.showapi.com/realtime-k"
    },
    // 股票实时分时线数据
    "STOCK_TIMELINE": {
        "method": "GET",
        "name": "STOCK_TIMELINE",
        "path": "http://ali-stock.showapi.com/timeline"
    },
    // 沪深及港股历史行情
    "STOCK_SZ_SH_STOCK_HISTORY": {
        "method": "GET",
        "name": "STOCK_SZ_SH_STOCK_HISTORY",
        "path": "http://ali-stock.showapi.com/sz-sh-stock-history"
    },
    // 股指实时K线数据
    "STOCK_INDEX_K_LINE": {
        "method": "GET",
        "name": "STOCK_INDEX_K_LINE",
        "path": "http://ali-stock.showapi.com/index-kline"
    },
    // 股票实时行情
    "STOCK_REAL_STOCK_INFO": {
      "method": "GET",
        "name": "STOCK_REAL_STOCK_INFO",
        "path": "http://ali-stock.showapi.com/real-stockinfo"
    },
    // 股票实时行情_批量
    "STOCK_BATCH_REAL_STOCK_INFO": {
        "method": "GET",
        "name": "STOCK_BATCH_REAL_STOCK_INFO",
        "path": "http://ali-stock.showapi.com/batch-real-stockinfo"
    },
    // 名称编码拼音查询股票信息
    "STOCK_NAME_TO_STOCK_INFO": {
        "method": "GET",
        "name": "STOCK_NAME_TO_STOCK_INFO",
        "path": "http://ali-stock.showapi.com/name-to-stockinfo"
    },
    // 股票列表查询
    "STOCK_LIST": {
        "method": "GET",
        "name": "STOCK_LIST",
        "path": "http://ali-stock.showapi.com/stocklist"
    },
    // 沪深股票最新50条逐笔交易
    "STOCK_EVERY_TRADE": {
        "method": "GET",
        "name": "STOCK_EVERY_TRADE",
        "path": "http://ali-stock.showapi.com/everytrade"
    }
};

export const USER = {
	"USER_REGISTER": {
		"method": "POST",
		"name": "USER_REGISTER",
		"path": "/user/register"
	},
	"USER_LOGIN": {
		"method": "POST",
		"name": "USER_LOGIN",
		"path": "/user/login"
	},
	"USER_LOGOUT": {
		"method": "GET",
		"name": "USER_LOGOUT",
		"path": "/user/logout"
	},
	"USER_GET_MY_INFO": {
		"method": "GET",
		"name": "USER_GET_MY_INFO",
		"path": "/user/getMyInfo"
	}
};

export const COLLECTION = {
	"COLLECTION_COLLECT": {
		"method": "POST",
		"name": "COLLECTION_COLLECT",
		"path": "/collection/collect"
	},
	"COLLECTION_UNCOLLECT": {
		"method": "GET",
		"name": "COLLECTION_UNCOLLECT",
		"path": "/collection/unCollect"
	},
	"COLLECTION_GET_COLLECTED": {
		"method": "GET",
		"name": "COLLECTION_GET_COLLECTED",
		"path": "/collection/getCollected"
	}
};
