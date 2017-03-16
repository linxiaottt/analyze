<template>
    <div class = "home-container">
        <div class = "main" :style = "{ top: -state.index * height + 'px' }">
            <section class = "section" id = "sec-1">
                <h1>股票分析系统</h1>
            </section>
            <section class = "section" id = "sec-2">
                <div class = "sec-2-filter">
                    <div class = "drop-down">
                        <span>
                            {{ state.curMarket ? `${ state.curMarket.short.toUpperCase() }（${ state.curMarket.name}）` : '您要选哪个股市'}}
                        </span>
                        <ul>
                            <li
                                v-for = "(item, index) in stock.markets"
                                @click = "handleClickSelectMarket(item)"
                                :key = "index">{{ `${item.short.toUpperCase()}(${item.name})` }}</li>
                        </ul>
                    </div>
                </div>
                <div class = "sec-2-content">
                    <div class= "sec-2-list" v-if = "indexListSearch.length">
                        <ul>
                            <span>\</span>
                            <li>市场</li>
                            <li>名字</li>
                            <li>代码</li>
                            <li>拼音</li>
                        </ul>
                        <ul v-for = "(row, rowIndex) in indexListSearch.slice((state.indexSearchPage - 1) * numPerPage, state.indexSearchPage * numPerPage)"
                            :key = "rowIndex">
                            <span>
                                {{ (rowIndex + 1) + (indexListSearch.currentPage - 1) * indexListSearch.maxResult + (state.indexSearchPage - 1) *numPerPage }}
                            </span>
                            <li v-for = "(col, colIndex) in row"
                                :key = "colIndex">
                                {{ col }}
                            </li>
                        </ul>
                    </div>
                    <div class = "sec-2-info">
                        <div class = "sec-2-page-wrap">
                            <Page
                                :pageLimit = "7"
                                :maxPage = "Math.floor(indexListSearch.allNum / numPerPage)"
                                :curPage = "(indexListSearch.currentPage - 1) * indexListSearch.maxResult / numPerPage + state.indexSearchPage"
                                :handleClickPageItem = "clickIndexListSearchPageItem"
                                />
                        </div>
                    </div>
                </div>
            </section>
            <section class = "section" id = "sec-3">

            </section>
            <section class = "section" id = "sec-4">
                <h2>上证指数</h2>
                <div id = "chart" ref = "chart"></div>
            </section>
        </div>
        <div class = "main-list">
                <a v-for = "(item, index) in newList(n)"
                :class = "{ active: item === state.index }"
                :key = "index"></a>
        </div>
    </div>
</template>
<script>
    import echarts from 'echarts';
    import fetch from 'node-fetch';
    import { mapState } from 'vuex';
    import Page from '../../components/Page';
    import { STOCK } from '../../common/constants';

    export default {
        data () {
            return {
                n: 5, // 总共的页数
                page: 1, // 当前页
                numPerPage: 10, // 每页最多显示10条数据
                chart: null,
                height: window.innerHeight,
                state: {
                    index: 0,
                    curMarket: null,
                    isTurning: false,
                    indexSearchPage: 1,
                },
                stock: {
                    markets: [{ short: 'sh', name: '上海' }, { short: 'sz', name: '深圳' }, { short: 'hk', name: '香港'}],
                }
            };
        },
        computed: {
            ...mapState([
                'indexListSearch',
                'indexTimeLine',
                'indexList',
                'realTimeK',
                'timeline',
                'history',
                'kLine',
                'realStockInfo',
                'batchRealStockInfo',
                'nameToStockInfo',
                'stockList',
                'recentTrade'
            ]),
        },
        components: { Page },
        methods: {
            draw () {
                let option = {};
                const data0 = splitData([
                    ['2013/1/24', 2320.26,2320.26,2287.3,2362.94],
                    ['2013/1/25', 2300,2291.3,2288.26,2308.38],
                    ['2013/1/28', 2295.35,2346.5,2295.35,2346.92],
                    ['2013/1/29', 2347.22,2358.98,2337.35,2363.8],
                    ['2013/1/30', 2360.75,2382.48,2347.89,2383.76],
                    ['2013/1/31', 2383.43,2385.42,2371.23,2391.82],
                    ['2013/2/1', 2377.41,2419.02,2369.57,2421.15],
                    ['2013/2/4', 2425.92,2428.15,2417.58,2440.38],
                    ['2013/2/5', 2411,2433.13,2403.3,2437.42],
                    ['2013/2/6', 2432.68,2434.48,2427.7,2441.73],
                    ['2013/2/7', 2430.69,2418.53,2394.22,2433.89],
                    ['2013/2/8', 2416.62,2432.4,2414.4,2443.03],
                    ['2013/2/18', 2441.91,2421.56,2415.43,2444.8],
                    ['2013/2/19', 2420.26,2382.91,2373.53,2427.07],
                    ['2013/2/20', 2383.49,2397.18,2370.61,2397.94],
                    ['2013/2/21', 2378.82,2325.95,2309.17,2378.82],
                    ['2013/2/22', 2322.94,2314.16,2308.76,2330.88],
                    ['2013/2/25', 2320.62,2325.82,2315.01,2338.78],
                    ['2013/2/26', 2313.74,2293.34,2289.89,2340.71],
                    ['2013/2/27', 2297.77,2313.22,2292.03,2324.63],
                    ['2013/2/28', 2322.32,2365.59,2308.92,2366.16],
                    ['2013/3/1', 2364.54,2359.51,2330.86,2369.65],
                    ['2013/3/4', 2332.08,2273.4,2259.25,2333.54],
                    ['2013/3/5', 2274.81,2326.31,2270.1,2328.14],
                    ['2013/3/6', 2333.61,2347.18,2321.6,2351.44],
                    ['2013/3/7', 2340.44,2324.29,2304.27,2352.02],
                    ['2013/3/8', 2326.42,2318.61,2314.59,2333.67],
                    ['2013/3/11', 2314.68,2310.59,2296.58,2320.96],
                    ['2013/3/12', 2309.16,2286.6,2264.83,2333.29],
                    ['2013/3/13', 2282.17,2263.97,2253.25,2286.33],
                    ['2013/3/14', 2255.77,2270.28,2253.31,2276.22],
                    ['2013/3/15', 2269.31,2278.4,2250,2312.08],
                    ['2013/3/18', 2267.29,2240.02,2239.21,2276.05],
                    ['2013/3/19', 2244.26,2257.43,2232.02,2261.31],
                    ['2013/3/20', 2257.74,2317.37,2257.42,2317.86],
                    ['2013/3/21', 2318.21,2324.24,2311.6,2330.81],
                    ['2013/3/22', 2321.4,2328.28,2314.97,2332],
                    ['2013/3/25', 2334.74,2326.72,2319.91,2344.89],
                    ['2013/3/26', 2318.58,2297.67,2281.12,2319.99],
                    ['2013/3/27', 2299.38,2301.26,2289,2323.48],
                    ['2013/3/28', 2273.55,2236.3,2232.91,2273.55],
                    ['2013/3/29', 2238.49,2236.62,2228.81,2246.87],
                    ['2013/4/1', 2229.46,2234.4,2227.31,2243.95],
                    ['2013/4/2', 2234.9,2227.74,2220.44,2253.42],
                    ['2013/4/3', 2232.69,2225.29,2217.25,2241.34],
                    ['2013/4/8', 2196.24,2211.59,2180.67,2212.59],
                    ['2013/4/9', 2215.47,2225.77,2215.47,2234.73],
                    ['2013/4/10', 2224.93,2226.13,2212.56,2233.04],
                    ['2013/4/11', 2236.98,2219.55,2217.26,2242.48],
                    ['2013/4/12', 2218.09,2206.78,2204.44,2226.26],
                    ['2013/4/15', 2199.91,2181.94,2177.39,2204.99],
                    ['2013/4/16', 2169.63,2194.85,2165.78,2196.43],
                    ['2013/4/17', 2195.03,2193.8,2178.47,2197.51],
                    ['2013/4/18', 2181.82,2197.6,2175.44,2206.03],
                    ['2013/4/19', 2201.12,2244.64,2200.58,2250.11],
                    ['2013/4/22', 2236.4,2242.17,2232.26,2245.12],
                    ['2013/4/23', 2242.62,2184.54,2182.81,2242.62],
                    ['2013/4/24', 2187.35,2218.32,2184.11,2226.12],
                    ['2013/4/25', 2213.19,2199.31,2191.85,2224.63],
                    ['2013/4/26', 2203.89,2177.91,2173.86,2210.58],
                    ['2013/5/2', 2170.78,2174.12,2161.14,2179.65],
                    ['2013/5/3', 2179.05,2205.5,2179.05,2222.81],
                    ['2013/5/6', 2212.5,2231.17,2212.5,2236.07],
                    ['2013/5/7', 2227.86,2235.57,2219.44,2240.26],
                    ['2013/5/8', 2242.39,2246.3,2235.42,2255.21],
                    ['2013/5/9', 2246.96,2232.97,2221.38,2247.86],
                    ['2013/5/10', 2228.82,2246.83,2225.81,2247.67],
                    ['2013/5/13', 2247.68,2241.92,2231.36,2250.85],
                    ['2013/5/14', 2238.9,2217.01,2205.87,2239.93],
                    ['2013/5/15', 2217.09,2224.8,2213.58,2225.19],
                    ['2013/5/16', 2221.34,2251.81,2210.77,2252.87],
                    ['2013/5/17', 2249.81,2282.87,2248.41,2288.09],
                    ['2013/5/20', 2286.33,2299.99,2281.9,2309.39],
                    ['2013/5/21', 2297.11,2305.11,2290.12,2305.3],
                    ['2013/5/22', 2303.75,2302.4,2292.43,2314.18],
                    ['2013/5/23', 2293.81,2275.67,2274.1,2304.95],
                    ['2013/5/24', 2281.45,2288.53,2270.25,2292.59],
                    ['2013/5/27', 2286.66,2293.08,2283.94,2301.7],
                    ['2013/5/28', 2293.4,2321.32,2281.47,2322.1],
                    ['2013/5/29', 2323.54,2324.02,2321.17,2334.33],
                    ['2013/5/30', 2316.25,2317.75,2310.49,2325.72],
                    ['2013/5/31', 2320.74,2300.59,2299.37,2325.53],
                    ['2013/6/3', 2300.21,2299.25,2294.11,2313.43],
                    ['2013/6/4', 2297.1,2272.42,2264.76,2297.1],
                    ['2013/6/5', 2270.71,2270.93,2260.87,2276.86],
                    ['2013/6/6', 2264.43,2242.11,2240.07,2266.69],
                    ['2013/6/7', 2242.26,2210.9,2205.07,2250.63],
                    ['2013/6/13', 2190.1,2148.35,2126.22,2190.1]
                ]);

                function splitData(rawData) {
                    var categoryData = [];
                    var values = []
                    for (var i = 0; i < rawData.length; i++) {
                        categoryData.push(rawData[i].splice(0, 1)[0]);
                        values.push(rawData[i])
                    }
                    return {
                        categoryData: categoryData,
                        values: values
                    };
                }

                function calculateMA(dayCount) {
                    var result = [];
                    for (var i = 0, len = data0.values.length; i < len; i++) {
                        if (i < dayCount) {
                            result.push('-');
                            continue;
                        }
                        var sum = 0;
                        for (var j = 0; j < dayCount; j++) {
                            sum += data0.values[i - j][1];
                        }
                        result.push(sum / dayCount);
                    }
                    return result;
                }

                option = {
                    title: {
                        text: '上证指数',
                        left: 0
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line'
                        }
                    },
                    legend: {
                        data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
                    },
                    grid: {
                        left: '10%',
                        right: '10%',
                        bottom: '15%'
                    },
                    xAxis: {
                        type: 'category',
                        data: data0.categoryData,
                        scale: true,
                        boundaryGap : false,
                        axisLine: {onZero: false},
                        splitLine: {show: false},
                        splitNumber: 20,
                        min: 'dataMin',
                        max: 'dataMax'
                    },
                    yAxis: {
                        scale: true,
                        splitArea: {
                            show: true
                        }
                    },
                    dataZoom: [{
                        type: 'inside',
                        start: 50,
                        end: 100
                    }, {
                        show: true,
                        type: 'slider',
                        y: '90%',
                        start: 50,
                        end: 100
                    }],
                    series: [{
                        name: '日K',
                        type: 'candlestick',
                        data: data0.values,
                        markPoint: {
                            label: {
                                normal: {
                                    formatter: function (param) {
                                        return param != null ? Math.round(param.value) : '';
                                    }
                                }
                            },
                            data: [{
                                name: 'XX标点',
                                coord: ['2013/5/31', 2300],
                                value: 2300,
                                itemStyle: {
                                    normal: {color: 'rgb(41,60,85)'}
                                }
                            }, {
                                name: 'highest value',
                                type: 'max',
                                valueDim: 'highest'
                            }, {
                                name: 'lowest value',
                                type: 'min',
                                valueDim: 'lowest'
                            }, {
                                name: 'average value on close',
                                type: 'average',
                                valueDim: 'close'
                            }],
                            tooltip: {
                                formatter: function (param) {
                                    return param.name + '<br>' + (param.data.coord || '');
                                }
                            }
                        },
                        markLine: {
                            symbol: ['none', 'none'],
                            data: [[{
                                name: 'from lowest to highest',
                                type: 'min',
                                valueDim: 'lowest',
                                symbol: 'circle',
                                symbolSize: 10,
                                label: {
                                    normal: {show: false},
                                    emphasis: {show: false}
                                }
                            }, {
                                type: 'max',
                                valueDim: 'highest',
                                symbol: 'circle',
                                symbolSize: 10,
                                label: {
                                    normal: {show: false},
                                    emphasis: {show: false}
                                }
                            }], {
                                name: 'min line on close',
                                type: 'min',
                                valueDim: 'close'
                            }, {
                                name: 'max line on close',
                                type: 'max',
                                valueDim: 'close'
                            }]
                        }
                    }, {
                        name: 'MA5',
                        type: 'line',
                        data: calculateMA(5),
                        smooth: true,
                        lineStyle: {
                            normal: {opacity: 0.5}
                        }
                    }, {
                        name: 'MA10',
                        type: 'line',
                        data: calculateMA(10),
                        smooth: true,
                        lineStyle: {
                            normal: {opacity: 0.5}
                        }
                    }, {
                        name: 'MA20',
                        type: 'line',
                        data: calculateMA(20),
                        smooth: true,
                        lineStyle: {
                            normal: {opacity: 0.5}
                        }
                    }, {
                        name: 'MA30',
                        type: 'line',
                        data: calculateMA(30),
                        smooth: true,
                        lineStyle: {
                            normal: {opacity: 0.5}
                        }
                    }]
                };
                this.chart.setOption(option);
            },
            handleMouseWheel (event) {
                if (this.state.isTurning) return;
                this.state.isTurning = true;
                setTimeout(() => { this.state.isTurning = false; }, 1500);
                const { wheelDelta } = event;
                if (wheelDelta >= 0) this.turnPage(false); // 向上翻页
                else this.turnPage(true); // 向上翻页
            },
            handleClickSelectMarket (item) {
                const page = 1;
                const market = item.short;
                this.state.curMarket = item;
                this.getIndexListSearch({ page, market });
            },
            clickIndexListSearchPageItem (index, oldIndex) {
                const config = {};
                const { numPerPage } = this;
                const { curMarket } = this.state;
                const { currentPage, maxResult } = this.indexListSearch;

                const nPart = Math.floor(maxResult / numPerPage);
                const rest = (index - 1) % nPart + 1;
                const divide = Math.floor((index - 1) / nPart);

                const success = () => { this.state.indexSearchPage = rest; };
                if (divide !== Math.floor(oldIndex / nPart )) {
                    this.getIndexListSearch({ page: divide + 1, market: curMarket, success });
                } else {
                    this.state.indexSearchPage = rest;
                }
            },
            turnPage (signal) {
                const { n } = this;
                let { index } = this.state;
                index = signal === false ? index - 1 : index + 1;
                index = Math.min(index, n - 1);
                index = Math.max(index, 0);
                this.state.index = index;
            },
            newList (n) {
                return new Array(n).fill(n).map((item, index) => index);
            },
            // 股指列表查询
            getIndexListSearch (data) {
                const { page, market, success } = data;
                const { maxResult } = 10;
                this.publish(STOCK.STOCK_INDEX_SEARCH.name, { success, query: { page, market, maxResult }});
            },
            // 股指实时分时线
            getIndexTimeLine () {
                const day = 1; // 1 - 5
                const code = '000001';
                this.publish(STOCK.STOCK_INDEX_TIMELINE.name, { query: { day, code }});
            },
            // 股指实时行情_批量
            getIndexList () {
                const stocks = 'sh000001,sz399001,sz399005,sz399006,hkhsi';
                this.publish(STOCK.STOCK_INDEX.name, { query: { stocks }});
            },
            // 股票实时K线数据
            getRealTimeK () {
                const beginDay = '20170316';
                const code = '000001';
                const time = 'day'; // '5' || '30' || '60' || 'day' || 'week' || 'month'
                const type = 'bfq'; // 'bfq' || 'qff'
                this.publish(STOCK.STOCK_REALTIME_K.name, { query: { beginDay, code, time, type }});
            },
            // 股票实时K线数据
            getTimeline () {
                const day = '1';
                const code = '601857';
                this.publish(STOCK.STOCK_TIMELINE.name, { query: { day, code }});
            },
            // 沪深及港股历史行情
            getHistory () {
                const begin = '2017-03-14';
                const code = '600004';
                const end = '2017-03-15';
                this.publish(STOCK.STOCK_SZ_SH_STOCK_HISTORY.name, { query: { begin, code, end } });
            },
            // 股指实时K线数据
            getKLine () {
                const beginDay = '20170315';
                const code = '000001';
                const time = 'day'; // '5' || '30' || '60' || 'day' || 'week' || 'month'
                this.publish(STOCK.STOCK_INDEX_K_LINE.name, { query: { time, code, beginDay }});
            },
            // 股票实时行情
            getRealStockInfo () {
                const code = '000001';
                const needIndex = 0; // 0 || 1;
                const needKPic = 0; // 0 || 1;
                this.publish(STOCK.STOCK_REAL_STOCK_INFO.name, { query: { code, needIndex, need_k_pic: needKPic}});
            },
            // 股票实时行情_批量
            getBatchRealStockInfo () {
                const needIndex = 0; // 0 || 1;
                const stocks = 'sh000001,sz399001,sz399005,sz399006,hkhsi';
                this.publish(STOCK.STOCK_BATCH_REAL_STOCK_INFO.name, { query: { stocks, needIndex }});
            },
            // 名称编码拼音查询股票信息
            getNameToStockInfo () {
                const code = '002739';
                const name = '万达';
                const pinyin = 'wd';
                this.publish(STOCK.STOCK_NAME_TO_STOCK_INFO.name, { query: { code, name, pinyin }});
            },
            // 股票列表查询
            getStockList () {
                const market = 'sz';
                const page = '1';
                this.publish(STOCK.STOCK_LIST.name, { query: { market, page }});
            },
            // 沪深股票最新50条逐笔交易
            getRecentTrade () {
                const code = '000002';
                this.publish(STOCK.STOCK_EVERY_TRADE.name, { query: { code }});
            },
            publish (type, payload) {
                const { dispatch } = this.$store;
                dispatch({ ... payload, type });
            },
        },
        mounted () {
            const chart = this.$refs.chart;
            this.chart = echarts.init(chart);
            this.draw();
            // 测试api
            // this.getIndexTimeLine();
            // this.getIndexList();
            // this.getRealTimeK();
            // this.getTimeline();
            // this.getHistory();
            // this.getKLine();
            // this.getRealStockInfo();
            // this.getBatchRealStockInfo();
            // this.getNameToStockInfo();
            // this.getStockList();
            // this.getRecentTrade();
            window.addEventListener('mousewheel', this.handleMouseWheel.bind(this));
        },
        beforeDestory () {
            window.removeEventListener('mousewheel', this.handleMouseWheel);
        },
    };
</script>
<style lang = "scss">
    .home-container { width: 100%; height: 100%; overflow: hidden; position: relative; }
    .main { width: 100%; height: 100%; position: absolute; transition: 500ms cubic-bezier(0.86, 0, 0.07, 1); }
    .section { width: 100%; height: 100%; display: block; color: #FFFFFF; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; }
    .main-list {
        width: 20px;
        right: 20px;
        height: 100%;
        display: flex;
        position: fixed;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }
    .main-list a {
        width: 10px;
        height: 10px;
        margin: 10px 0;
        display: block;
        border-radius: 50%;
        border: 1px solid #ffffff;
    }
    .main-list .active { background-color: #ffffff; }
    #sec-1 {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #sec-1 h1 {
        margin: 0;
        font-size: 100px;
        padding-bottom: 200px;
        box-sizing: border-box;
        text-shadow: 1px 1px 3px #ffffff, 2px 2px 7px #ffffff, 3px 3px 10px #ffffff, 5px 5px 15px #000000;
    }
    #sec-2 { box-sizing: border-box; }

    .sec-2-filter {
        margin: 40px 0 40px;
        position: relative;
        &:after {
            content: '.';
            font-size: 0;
            display: block;
            clear: both;
        }
        .drop-down {
            width: 128px;
            height: 40px;
            line-height: 40px;
            margin: 0 auto;
            color: #000000;
            background: #FFFFFF;
            position: relative;
            float: right;
            right: 20px;
            box-sizing: border-box;
            &:hover ul { opacity: 1; margin: 20px 0 0 0; }

            span {
                display: block;
                width: 100%;
                height: 100%;
            }
            ul {
                list-style-type: none;
                position: absolute;
                background: inherit;
                padding: 0;
                margin: 10px 0 0 0;
                opacity: 0;
                width: 100%;
                transition: all .5s ease;

                li:hover { background: #4f7f9b; color: #ffffff; }
            }
        }
    }
    #sec-2 .sec-2-content {
        .cell {
            display: flex;
            align-items: center;
            justify-content: center;
            /*box-shadow: 0px 0px 0px 1px #ffffff;*/
            /*& { border-bottom: 1px solid #ffffff; };*/
        }
        .sec-2-list {
            display: flex;
            flex-direction: column;
            ul {
                display: flex;
                margin: 0 auto;
                flex-direction: row;
                border-bottom: 1px solid #ffffff;
                &:first-child { border-top: 1px solid #ffffff; }
                &:nth-child(2n) { background: rgba(43, 121, 179, .3); }
                span {
                    width: 50px;
                    @extend .cell;
                    border: 1px solid #ffffff;
                    border-width: 0 1px;
                }
                li {
                    width: 180px;
                    height: 30px;
                    text-align:center;
                    padding: 5px 10px;
                    vertical-align: middle;
                    box-sizing: border-box;
                    box-shadow: 0px 0px 0px 1px #ffffff;
                    &:hover { background: #ffffff; color: #000000; }
                    @extend .cell;
                }
            }
        }
    }

    #sec-3 {}
    #sec-4 {
        h2 { font-size: 40px;  padding: 30px; }
    }
    #chart {
        width: 100%;
        height: 400px;
    }
</style>
