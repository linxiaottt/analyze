<<!-->
	K线图组件
</!-->
<template>
	<div class = "k-container" ref = "container">
	</div>
</template>
<script>
	import echarts from 'echarts';
	import { realTimeK } from '../common/echart-stock';
	export default {
		data () { return {
			chart: null,
		}; },
		props: ['x', 'y', 'k', 'v'],
		watch: {
			x () { this.draw(); },
			y () { this.draw(); },
			k () { this.draw(); },
			v () { this.draw(); }
		},
		methods: {
            draw () {
            	const option = realTimeK;
            	const { x, k, v } = this;
            	if (!(x && k && v)) return;
            	option.series[0].data = k;
                option.series[1].data = v;
                option.xAxis[0].data = option.xAxis[1].data = x;
                this.chart.setOption(option);
            },
		},
		mounted () {
			const { x, y, k, v } = this;
			const container  = this.$refs.container;
			this.chart = echarts.init(container);
			this.draw();
		},
	};
</script>
<style lang = "scss">
	.k-container {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}
</style>
