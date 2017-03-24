<!-->
	下拉组件
	options [Array] 选项
	placeholder [String] 默认label
	handleClickOption [Function] 点击选项的执行函数
</!-->
<template>
	<div class = "selector-container">
		<div class = "drop-down">
			<span>
				{{ value || placeholder || '请选择' }}
			</span>
			<ul>
				<li v-for = "(item, index) in opts" :key = "index" @click = "clickOption(item)">
					{{ item.name }}
				</li>
			</ul>
		</div>
	</div>
	</template>
	<script>
		export default {
			data () { return { value: '' }; },
			props: ['options', 'placeholder', 'handleClickOption'],
			methods: {
				clickOption (item) {
					this.value = item.name;
					if (this.handleClickOption) return this.handleClickOption(item.value);
				},
			},
			computed: {
				opts () {
					let { options } = this;
					if (!(options && options instanceof Array)) return options;
					if (options[0] && (typeof options[0] === 'string' || typeof options[0] === 'number')) {
						options = options.map( item => ({ name: item, value: item }));
					}
					return options;
				},
			},
		};
	</script>
	<style lang = "scss">
		.selector-container {
			height: 100%;
			position: relative;
			font-size: inherit;
			line-height: 1.5em;

			.drop-down {
				width: 128px;
				height: 100%;
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
					z-index: 1;
					opacity: 0;
					width: 100%;
					list-style-type: none;
					position: absolute;
					background: inherit;
					margin: 10px 0 0 0;
					transition: all .5s ease;

					li { padding: 5px; }
					li:hover { background: #4f7f9b; color: #ffffff; }
				}
			}
		}
	</style>
