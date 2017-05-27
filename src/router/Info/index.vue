<template>
	<div class = "info-wrap">
        <Navigator />
		<div class = "info-container">
			<div class = "info-main">
				<ul class = "info-short">
					<div class = "info-title">股票基本信息
						<span class = "info-collect"
						:class = "{'info-collected': isCollected}"
						v-loading.lock = "isLoading"
						@click = "collect">
						{{ isCollected ? "已收藏" : "收藏" }}
					</span>
				</div>
				<li v-for = "(value, key, index) in stockInfo" :key = "index" v-if = "value.length" >
					<span class = "info-stock-key"> {{ key | stockKeyFilter }} : </span>
					<span class = "info-stock-value"> {{ value }}</span>
				</li>
			</ul>
			<div class = "info-k" >
				<div class = "info-title" v-if = "false">K线图</div>
				<div class = "info-k-control">
					<div>
						<Datepicker language = "zh" format ="yyyyMMdd"
						placeholder = "请输入开始日期" v-on:selected = "clickDate"/>
					</div>
					<div>
						<Selector :options = "timeList | timeListFilter(stockInfo)" placeholder = "分时线" :handleClickOption = "clickFS"/>
					</div>
					<div>
						<Selector :options = "fqList" placeholder = "复权方式" :handleClickOption = "clickFQ"/>
					</div>
				</div>
				<div class = "info-k-container">
					<K :k = "k.k" :v = "k.v" :x = "k.x" />
				</div>
			</div>
		</div>
		<div class = "info-side">
			<div class = "info-title">股票实时行情</div>
			<ul>
				<li v-for = "(value, key, index) in realtime" :key = "index" >
					<span class = "info-realtime-key"> {{ key | realtimeKeyFilter }} : </span>
					<span class = "info-realtime-value">{{ value }}</span>
				</li>
			</ul>
		</div>
	</div>
	<div class = "info-something">
		<h2 class = "info-stock-name">相关信息</h2>
		<div class = "info-sth-container">
			<el-table :data="stockNews" border style="width: 100%" @row-click = "handleClickNewsTableRow">
				<el-table-column prop="title" label="标题" sortable width="500">
				</el-table-column>
				<el-table-column prop="time" label="时间" width="500">
				</el-table-column>
			</el-table>
		</div>
	</div>
    <Login />
</div>
</template>
<script>
    import PUBSUB from 'pubsub-js';
	import Datepicker from 'vuejs-datepicker';
	import { mapState, mapGetters } from 'vuex';

	import K from '../../components/K';
    import Login from '../../components/Login';
	import Selector from '../../components/Selector';
    import Navigator from '../../components/Navigator';

	import { STOCK, COLLECTION } from '../../common/constants';

	export default {
		data () {
			return {
				stockInfo: {},
				realtime: {},
				isCollected: false,
				isLoading: false,
				k: {
					x: [],
					y: [],
					k: [],
					v: [],
				},
				state:{
					fs: '',
					fq: '',
					beginDay: ''
				},
				fqList : [{
					name: '不复权',
					value: 'bfq'
				}, {
					name: '前复权',
					value: 'qfq'
				}],
				timeList: ['5', '30', '60', 'day', 'week', 'month']
			};
		},
		watch: {
			nameToStockInfo (value) {
				const data = value instanceof Array ? value[0] : value;
				this.stockInfo = data;
			},
			realStockInfo (value) {
				const data = value instanceof Array ? value[0] : value;
				this.realtime = data;
			},
			realTimeK (value) {
				let keys = Object.keys(value[0]);
				let values = [], times = [], volumns = [];
				let timeIndex = keys.findIndex(item => item === 'time');
				let volumnIndex = keys.findIndex(item => item === 'volumn');
				for (const item of value) {
					const list = Object.values(item);
					times.push(list.splice(timeIndex, 1)[0]);
					volumns.push(list.splice(volumnIndex, 1)[0]);
					values.push([list[1], list[3], list[0], list[2]]);
				}
				this.k.x = times;
				this.k.k = values;
				this.k.v = volumns;
			},
		},
		computed: {
			...mapState([
				'userInfo',
				'stockNews',
				'realTimeK',
				'realStockInfo',
				'nameToStockInfo',
				]),
		},
		components: { K, Datepicker, Selector, Login, Navigator },
		filters: {
			timeListFilter (value, stockInfo) {
				const market = 'hk';
				const black = ['5', '30', '60'];
				if (stockInfo && stockInfo.market !== market) return value;
				return value.filter( item => !(item in black));
			},
			stockKeyFilter (value) {
				switch (value) {
					case 'market': return '市场';
					case 'state': return '股票状态';
					case 'name': return '股票名称';
					case 'code': return '股票代码';
					case 'pinyin': return '拼音简写';
					case 'mgjzc': return '每股净资产（元）';
					case 'profit_four': return '四季度净利润';
					case 'currcapital': return '当前股本(万股)';
					case 'totalcapital': return '总股本(万股)';
                    case 'ct': return '返回时间';
                    case 'listing_date': return '列表时间';
					default: return value;
				};
			},
			realtimeKeyFilter (value) {
				switch (value) {
					case 'todayMax': return '今日最高价';
					case 'highLimit': return '涨停价';
					case 'buy5_n': return '买五';
					case 'buy2_n': return '买二';
					case 'tradeNum': return '成交量(股)';
					case 'buy2_m': return '买二报价';
					case 'buy5_m': return '买五报价';
					case 'sell3_m': return '卖三报价';
					case 'buy3_m': return '买三报价';
					case 'openPrice': return '今日开盘价';
					case 'buy4_m': return '买四报价';
					case 'circulation_value': return "循环值";
					case 'buy4_n': return '买四';
					case 'date': return '日期';
					case 'sell5_n': return '卖五';
					case 'buy3_n': return '买三';
					case 'all_value': return "所有值";
					case 'sell5_m': return '卖五报价';
					case 'closePrice': return '昨日收盘价';
					case 'time': return "刷新时间";
					case 'turnover': return "换手率";
					case 'name': return "股票名称";
					case 'sell3_n': return '卖三';
					case 'sell4_n': return '卖四';
					case 'downLimit': return '跌停价';
					case 'tradeAmount': return '成交金额（元）';
					case 'sell4_m': return '卖四报价';
					case 'swing': return '振幅';
					case 'diff_rate': return '涨跌幅度';
					case 'yestodayClosePrice': return '昨日收盘价';
					case 'sell1_n': return '卖一';
					case 'todayMin': return '今日最低价';
					case 'sell1_m': return '卖一报价';
					case 'max52': "最大五十二";
					case 'diff_money': return '涨跌金额';
					case 'code': return '股票编码';
					case 'nowPrice': return '当前价';
					case 'sell2_m': return '卖二';
					case 'min52': "最小五十二";
					case 'sell2_n': return '卖二';
					case 'buy1_m': return '买一报价（元）';
					case 'pe': return '市盈率';
					case 'buy1_n': return '买一数量（股）';
					case 'market': return '市场';
					case 'pb': return '市净率';
					default: return value;
				};
			},
		},
		methods: {
			collect () {
				if (this.isLoading) return ;
				if (!this.userInfo.id) return this.callLater(this.hasCollected.bind(this)) && PUBSUB.publish('login-show', "login");
				if (this.isCollected) return this.unCollect();
				const { code, market, name: stockName } = this.stockInfo;
				const { name } = COLLECTION.COLLECTION_COLLECT;
				const final = () => { this.isLoading = false; };
				const success = () => { this.isCollected = !this.isCollected; };
				this.publish(name, { success, final, data: { code, market, username: this.userInfo.username, name: stockName }});
			},
            hasCollected () {
                const { code, market } = this.stockInfo;
                const { name } = COLLECTION.COLLECTION_HAS_COLLECTED;
                const  success  = (payload) => { this.isCollected = payload.data.has; };
                this.publish(name, { success, query: { market, code, username: this.userInfo.username } });
            },
			unCollect() {
				const { code, market } = this.stockInfo;
				const { name } = COLLECTION.COLLECTION_UNCOLLECT;
				const final = () => { this.isLoading = false; };
				const success = () => { this.isCollected = !this.isCollected; };
				this.publish(name, { success, final, query: { code, market, username: this.userInfo.username }});
			},
			publish (type, payload) {
				const { dispatch } = this.$store;
				dispatch({ ... payload, type });
			},
            callLater (callback, time) {
                time = time || 1000;
                console.log(this, 1);
                setTimeout(callback.bind(this), time);
                return true;
            },
            handleClickNewsTableRow (data) {
                if (data.url) window.open(data.url);
            },
			getStockNews () {
				const n = 51;
				const page = 1;
				const type = 2;
                const { market, code } = this.stockInfo;
				const symbol = market + code;
				const _var = "finance_news";
				this.publish(STOCK.STOCK_NEWS.name, { query: { n, page, type, symbol }});
			},
			getNameToStockInfo (code) {
				const query = { code };
				this.publish(STOCK.STOCK_NAME_TO_STOCK_INFO.name, { query });
			},
			getRealStockInfo (code) {
				const needIndex = 0; // 0 || 1;
				const needKPic = 0; // 0 || 1;
				this.publish(STOCK.STOCK_REAL_STOCK_INFO.name, { query: { code, needIndex, need_k_pic: needKPic}});
			},
			getRealTimeK ({ code, beginDay, time, type }) {
				const query = {};
				if (type) query.type = type;
				if (time) query.time = time;
				if (code) query.code = code;
				if (beginDay) query.beginDay = beginDay;
				// beginDay '20170210';
				// type  'bfq' || 'qfq';
				// time  '5' || '30' || '60' || 'day' || 'week' || 'month';
				this.publish(STOCK.STOCK_REALTIME_K.name, { query });
			},
			queryRealTimeK () {
				const { code } = this.$route.params;
				const { fq, fs, beginDay } = this.state;
				this.getRealTimeK({ code, time: fs, type: fq, beginDay });
			},
			filterDate (date) {
				let day = date.getDate() + '';
				let month = date.getMonth() + 1 + '';
				const year = date.getFullYear() + '';

				day = day.length === 1 ? '0' + day : day;
				month = month.length === 1 ? '0' + month : month;
				return `${year}${month}${day}`;
			},
			clickFQ (value) { this.state.fq = value; this.queryRealTimeK(); },
			clickFS (value) { this.state.fs = value; this.queryRealTimeK(); },
			clickDate (value) { this.state.beginDay = this.filterDate(value); this.queryRealTimeK(); },
		},
		mounted () {
			const { code } = this.$route.params;
            const self = this;
			this.getNameToStockInfo(code);
			this.getRealStockInfo(code);
			this.getRealTimeK({ code });
            setTimeout(function () {
			    self.getStockNews();
                self.hasCollected();
            }, 1000);

		},
	};
</script>
<style lang = "scss">
	.info-wrap { height: 100%; overflow: scroll; }
	.info-something {
		height: 100%;
		background: inherit;
		background-color: #4f7f9b;
		background-position: fixed;
		background-repeat: repeat-x;
		background-image: linear-gradient(#4f7f9b, #293c55);
		.info-stock-name { font-size: 24px;  padding: 20px 0 0; text-align: center; color: #ffffff;}
	}
	.info-container {
		display: flex;
		flex-direction: row;

		width: 100%;
		height: 100%;

        padding: 20px;
		box-sizing: border-box;
		box-shadow: 0px 5px 5px 0 #5f3c55;
		color: #ffffff;
		font-size: 10px;

		.info-main {
			display: flex;
			flex: 1 1 75%;
			margin-right: 20px;
			flex-direction: column;
			box-sizing: border-box;
			.info-short { flex: 2 1 30%; margin-bottom: 20px; box-sizing: border-box; @extend .border; overflow: scroll; padding: 10px; }
			.info-k { flex: 1 1 70%; box-sizing: border-box; @extend .border; overflow: scroll;  padding: 10px; }
		}
		.info-side {
			height: 100%;
			flex: 1 1 25%;
			padding: 10px;
			box-sizing: border-box;
			overflow: scroll;
			@extend .border;
		}
	}
	.border { border: 1px solid #ffffff; border-radius: 4px; }

	/*区块处理*/
	.info-title { position: relative; width: 100%; box-sizing: border-box; text-align: center; font-size: 20px; font-weight: 800; margin-bottom: 8px; }
	.info-collect {
		position: absolute;
		right: 0;
		bottom: 0;
		height: 100%;
		font-size: .6em;
		cursor: pointer;
		&:hover { color: #20a0ff; }
	}
	.info-collected { color: #666666; &:hover { color: #666666; } }
	.info-short {
		font-size: 0;
		li {
			width: 50%;
			font-size: 16px;
			padding: 2px 20px;
			white-space: nowrap;
			display: inline-block;
			box-sizing: border-box;
			&:nth-of-type(2n + 1) { border-right: 1px solid #218ad2; }
			&:nth-of-type(4n + 1), &:nth-of-type(4n + 2)  { background-color: #ffffff; color: #000000; };
		}
		.info-stock-key { color: #ea912e; font-weight: 600; display: inline-block;  box-sizing: border-box; padding-left: 10%; }
		.info-stock-value { display: inline-block;  box-sizing: border-box; }
	}
	.info-k {
		display: flex;
		flex-direction: column;
		.info-k-control {
			display: flex;
			color: #000000;
			flex: 0 0 auto;
			margin: 5px 0 10px;
			box-sizing: border-box;
			justify-content: flex-end;

			& > div { position: relative; padding: 0 5px; box-sizing: border-box; }
		}
		.info-k-container { height: 100%; }
	}
	.info-side {
		ul {}
		li {
			display: block;
			padding: 5px 20px;
			box-sizing: border-box;
			white-space: nowrap;
			&:nth-of-type(2n + 1) { background-color: #ffffff; color: #000000; };
		}
		.info-realtime-key { color: #ea912e; font-weight: 600; display: inline-block;box-sizing: border-box; }
		.info-realtime-value { display: inline-block; box-sizing: border-box; }
	}
	@media all and (max-width: 512px) {
		.info-short {
			li { display: block; width: 100%; &:nth-child(2n + 1) { margin-left: 0px; } }
		}
	}
</style>
