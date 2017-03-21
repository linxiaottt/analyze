<!--
    * 纯表格组件
    **** Props
    * curPage [Number]: 当前是第几页
    * numPerPage [Number]: 每页显示多少个

    * head [Array]: 表头 [{ name: '列1'}] or ['列1'，'列2']
    * data [ [[], [], []] ]: 数据
    * handleClickItem [Function]: 点击单元格的函数
    * handleClickHeadItem [Function]: 点击表头的函数
    *
!-->
<template>
    <div class= "table-container" v-if = "this.props.data && this.props.data.length">
        <p class = "table-Mytitle" v-if = "this.props.title"> {{ this.props.title }} </p>
        <ul class = "table-head">
            <span class = "table-left-top">\</span>
            <li v-for= "(item, index) in this.props.head" :key = "index"> {{ item.name ? item.name: item }}</li>
        </ul>
        <ul class = "" v-for = "(row, rowIndex) in this.props.data" :key = "rowIndex">
            <span>
                {{ (this.props.curPage - 1) * this.props.numPerPage + rowIndex + 1 }}
            </span>
            <li v-for = "(col, colIndex) in row" :key = "colIndex">
                {{ col }}
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        props: ['title', 'data', 'curPage', 'pageMax', 'numPerPage']
    };
</script>
<style lang = "scss">
    .table-container {
        display: flex;
        flex-direction: column;
        .cell {
            align-items: center;
            justify-content: center;
            /*box-shadow: 0px 0px 0px 1px #ffffff;*/
            /*& { border-bottom: 1px solid #ffffff; };*/
        }
        ul {
            display: flex;
            margin: 0 auto;
            flex-direction: row;
            border-bottom: 1px solid #ffffff;
            &:first-child { border-top: 1px solid #ffffff; }
            &:nth-child(2n) { background: rgba(43, 121, 179, .3); }
            span {
                width: 50px;
                border: 1px solid #ffffff;
                border-width: 0 1px;
                @extend .cell;
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

</style>
