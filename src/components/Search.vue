<<!-->
    纯搜索组件
    result [Array] input返回的结果
    handleInput [Function] 输入时的回调函数
    handleSubmit [Function] 当点击提交时
    handleClickItem [Function] 点击待选栏
</!-->
<template>
    <div class = "search-container">
        <div class = "search-item">
            <input type="text"
                autofocus = "autofocus"
                placeholder = "输入"
                v-model = "content"
                @input = "input"
                @keydown.13 = "clickSubmit">
            <a href = "javascript:void(0)" @click = "clickSubmit">click me</a>
        </div>
        <ul class = "search-relative" v-if = "result && result.length" :class="{ active: result && result.length }">
            <li
                v-for = "(item, index) in result.slice(0, 5)"
                :key = "index"
                class = "active"
                @click = "clickItem(item)"
                >{{ item.name }}</li>
        </ul>
    </div>
</template>
<script>
    export default {
        data () {
            return { content: ''};
        },
        props: ['result', 'handleInput', 'handleClickSubmit'],
        methods: {
            input () {
                const { content } = this;
                if (!content.toString().trim().length) return;
                this.result.push({name: 'xxxx'});
                if (this.handleInput) return this.handleInput(content);
            },
            clickItem (item) {
                if (this.handleClickItem) return this.handleClickItem(item);
            },
            clickSubmit () {
                const { content } = this;
                if (!content.toString().trim().length) return console.log('请输入文字');
                if (this.handleSubmit) return this.handleSubmit(content);
            },
        },
    };
</script>
<style lang = "scss">
    .search-container {
        width: 70%;
        max-width: 800px;
        min-width: 200px;
        margin: 0 auto;
        position: absolute;
        font-size: 10px;
        .search-item {
            display: flex;
            height: 40px;
            line-height: 40px;
            font-size: 2em;

            input { outline: none; height: 100%; box-sizing: border-box; border: none; padding: 0; font-size: inherit; line-height: inherit; flex: 1 1 0;}
            a { text-decoration: none; height: 100%;  box-sizing: border-box; line-height: inherit; flex: 1 1 1;}
            a:hover { color: #ffffff; background: #00ffff; }
        }
        .search-relative {
            width: 100%;
            margin-top: 0;
            position: absolute;
            box-sizing: border-box;
            border: 1px solid #aeaeae;
            opacity: 0;
            padding: 5px 10px;
            color: #000000;
            background: #ffffff;
            transition: all .6s ease-in-out;

            li {
                font-size: 1.6em;
                padding: 5px 20px;
                padding-left: 40px;
                transition: all .6s ease-in-out;
                cursor: pointer;
                &:not(:first-child) { border-top: 1px solid #aeaeae; }
                &:hover { color: #0a0a0a; background: #aeaeae; }
                &.active { padding-left: 20px; }
            }
            &.active {  margin-top: 20px; opacity: 1; }
        }
    }
</style>
