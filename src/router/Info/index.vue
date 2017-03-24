<template>
	<div class = "info-container">
		<div class = "info-main">
			<ul class = "info-short">
				<div class = "info-title">股票基本信息</div>
				<li v-for = "(value, key, index) in stockInfo" :key = "index" v-if = "value.length">
					<span class = "info-stock-key"> {{ key | stockKeyFilter }} : </span>
					<span class = "info-stock-value"> {{ value }}</span>
				</li>
			</ul>
			<div class = "info-k" >
				<div class = "info-title" v-if = "false">K线图</div>
				<div class = "info-k-control">
					<Datepicker language = "zh" v-model = "beginDay" format ="yyyyMMdd" placeholder = "请输入开始日期"/>
					<div>
						<Selector :options = "timeList | timeListFilter(stockInfo)" placeholder = "分时线" :handleClickOption = "clickFS"/>
					</div>
					<div>
						<Selector :options = "['不复权', '前分权']" placeholder = "复权方式" :handleClickOption = "clickFQ"/>
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
</template>
<script>
	import Datepicker from 'vuejs-datepicker';
	import { mapState, mapGetters } from 'vuex';

	import K from '../../components/K';
	import Selector from '../../components/Selector';

	import { STOCK } from '../../common/constants';

	export default {
		data () {
			return { stockInfo: {}, realtime: {}, beginDay: '',k: {
				x: [],
				y: [],
				k: [],
				v: [],
			}, state: { fs: '', fq: '', }, fqList : ['不复权', '前复权'], timeList: ['5', '30', '60', 'day', 'week', 'month'] };
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
				'realTimeK',
				'realStockInfo',
				'nameToStockInfo',
			]),
		},
		components: { K, Datepicker, Selector },
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
			publish (type, payload) {
				const { dispatch } = this.$store;
				dispatch({ ... payload, type });
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

				beginDay = '20170210';
				time = 'week'; // '5' || '30' || '60' || 'day' || 'week' || 'month'
				type = 'bfq'; // 'bfq' || 'qfq'
				this.publish(STOCK.STOCK_REALTIME_K.name, { query: { beginDay, code, time, type }});
			},
			clickFQ (value) { this.state.fq = value; },
			clickFS (value) { this.state.fs = value; },
		},
		mounted () {
			const { code } = this.$route.params;
			this.getNameToStockInfo(code);
			this.getRealStockInfo(code);
			this.getRealTimeK({ code, });
		},
	};
</script>
<style lang = "scss">
	.info-container {
		display: flex;
		flex-direction: row;

		width: 100%;
		height: 100%;
		padding: 20px;
		box-sizing: border-box;

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
	 .info-title { width: 100%; box-sizing: border-box; text-align: center; font-size: 20px; font-weight: 800; margin-bottom: 8px; }
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
			box-sizing: border-box;
			margin-bottom: 10px;
			flex: 0 0 auto;
		}
		.info-k-container { height: 100%;}
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
