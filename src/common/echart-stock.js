export const realTimeK = {
    backgroundColor: 'transparent',
    animation: false,
    legend: {
        bottom: 10,
        left: 'center',
        data: []
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'line'
        }
    },
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: false
            },
            brush: {
                type: ['lineX', 'clear']
            }
        }
    },
    brush: {
        xAxisIndex: 'all',
        brushLink: 'all',
        outOfBrush: {
            colorAlpha: 0.1
        }
    },
    grid: [{
        left: '8%',
        right: '8%',
        height: '50%'
    }, {
        left: '8%',
        right: '8%',
        top: '60%',
        height: '23%'
    }],
    xAxis: [{
        type: 'category',
        gridIndex: 0,
        data: [],
        scale: true,
        boundaryGap : true,
        axisLine: { onZero: false },
        splitLine: { show: false },
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax'
    }, {
        type: 'category',
        gridIndex: 1,
        data: [],
        scale: true,
        boundaryGap : true,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax'
    }],
    yAxis: [{
        scale: true,
        gridIndex: 0,
        splitArea: {
            show: true
        },
        boundaryGap: true
    }, {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        boundaryGap: true,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false }
    }],
    dataZoom: [{
        type: 'inside',
        xAxisIndex: [0, 1],
        start: 0,
        end: 100
    }, {
        show: true,
        xAxisIndex: [0, 1],
        type: 'slider',
        top: '85%',
        start: 90,
        end: 100
    }],
    series: [{
        name: 'Dow-Jones indexssssss',
        type: 'candlestick',
        data: [],
        xAxisIndex: 0,
        yAxisIndex: 0,
        itemStyle: {
            normal: {
                borderColor: null,
                borderColor0: null
            }
        },
        tooltip: {

        }
    }, {
        name: 'Volumn',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: []
    }]
};

class Chart {
    constructor() {}
    getDefaultTitle () {
        return { show: true, text: 'init', link: '', target: 'blank', textStyle: {}, textAlign: 'center' };
    }
    getDefaultLegend () {
        return {
            bottom: 'auto',
            left: 'center',
            data: [],
        };
    }
    getDefaultToolTip () {
        return {
            trigger: 'axis', // 触发类型
            triggerOn: 'mousemove', // 触发事件
            axisPointer: {
                type: 'line'
            },
            textStyle: {},
            data: [],
        };
    }
    getDefaultToolBox () {
        return {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: false
                },
                brush: {
                    type: ['lineX', 'clear']
                }
            }
        };
    }
    getDefaultBrush () {
        return {
            xAxisIndex: 'all',
            brushLink: 'all',
            outOfBrush: {
                colorAlpha: 0.1
            }
        };
    }
    getDefaultGrid () {
        return {
            width: 'auto',
            height: 'auto',
            left: 'auto',
            right: 'auto',
        };
    }
    getDefaultAxis () {}
    getDefaultDataZoom () {}
    getDefaultSeries () {}

};
class KChart extends Chart{
    constructor () { super(); }
};
