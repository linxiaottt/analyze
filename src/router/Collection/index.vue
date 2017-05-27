<template>
	<div class = "collection-container">
		<Navigator />
		<div class = "collection-main">
			<el-table :data="collectionTable" border style="width: 100%" :stripe = "true" @row-click="handleClickRow">
				<el-table-column prop="stockName" label="股票名称" width="250"></el-table-column>
				<el-table-column prop="stockMarket" label="股票市场" width="250"></el-table-column>
				<el-table-column prop="stockId" label="股票编码" width="250"></el-table-column>
				<el-table-column prop="createAt" label="收藏时间" sortable width="250"></el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-button size="small" type="danger"
						@click="handleUnCollect(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination v-if = "false"
				@current-change ="true"
				layout="prev, pager, next"
				:total="1000">
			</el-pagination>
		</div>
	</div>
	<Login />
</div>
</template>
<script>
    import PUBSUB from 'pubsub-js';
	import { mapState } from 'vuex';

	import Login from '../../components/Login';
	import Navigator from '../../components/Navigator';
	import { COLLECTION } from '../../common/constants';

	export default {
		data () {
			return {
			};
		},
		computed: {
			...mapState(['userInfo', 'collectionTable']),
		},
		methods: {
            handleClickRow (data, event, col) {
                if (/操作/.test(col.label)) return;
                const { stockId } = data;
                this.$router.push('/stock/' + stockId);
            },
            handleUnCollect (index, data) {
                const { stockId, stockMarket } = data;
                const success = () => { this.publish(COLLECTION.COLLECTION_DELETE_BY_ID.name, { id: stockId }); };
                this.publish(COLLECTION.COLLECTION_UNCOLLECT.name, { success, query: { code: stockId, market: stockMarket } });
            },
			publish (type, payload) {
				const { dispatch } = this.$store;
				dispatch({ type, ...payload });
		},
		},
		components: {
			Login,
			Navigator,
		},
		filters: {
			date (string) {
				return string;
			}
		},
		mounted () {
			const { username } = this.userInfo;
			const { name } = COLLECTION.COLLECTION_GET_COLLECTED;
			this.publish(name, { query: { username }});
		},

	};
</script>
<style lang = "scss">
	.collection-container {}
	.collection-main {}
</style>
