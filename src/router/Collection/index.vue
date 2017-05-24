<template>
	<div class = "collection-container">
		<Navigator />
		<div class = "collection-main">
			<el-table :data="collectionTable" border style="width: 100%">
				<el-table-column prop="stockMarket" label="股票市场" width="250"></el-table-column>
				<el-table-column prop="stockId" label="股票编码" width="250"></el-table-column>
				<el-table-column prop="createAt" label="收藏时间" sortable width="250"></el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-button size="small"
						@click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="small" type="danger"
						@click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination
				@current-change ="handleCurrentChange"
				layout="prev, pager, next"
				:total="1000">
			</el-pagination>
		</div>
	</div>
	<Login />
</div>
</template>
<script>
	import { COLLECTION } from '../../common/constants';

	import Login from '../../components/Login';
	import Navigator from '../../components/Navigator';

	import { mapState } from 'vuex';
	export default {
		data () {
			return {
			};
		},
		computed: {
			...mapState(['userInfo', 'collectionTable']),
		},
		methods: {
			handleEdit () {},
			handleDelete () {},
			handleCurrentChange () {},
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
				console.log(string);
				return string;
			}
		},
		mounted () {
			// if (!this.userInfo.id) return this.$notify({ type: 'warning', title: '', message: '请先登录'});
			const { username } = this.userInfo;
			const { name } = COLLECTION.COLLECTION_GET_COLLECTED;
			this.publish(name, { query: { username: 1 }});
		},

	};
</script>
<style lang = "scss">
	.collection-container {}
	.collection-main {}
</style>
