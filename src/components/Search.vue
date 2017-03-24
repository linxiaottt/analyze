<<!-->
    纯搜索组件
    dropdown [Array] input返回的结果
    placeholder [String] placeholader
    handleInput [Function] 输入时的回调函数
    handleSubmit [Function] 当点击提交时
    handleClickItem [Function] 点击待选栏
    <Search :dropdown = "[]" :handleInput = "()=>{}" :handleSubmit = "()=>{}" :handleClickItem = "()=>{}" />
</!-->
<template>
    <div class = "search-container">
        <div class = "search-item">
            <input type = "text"
            	ref = "input"
                :placeholder = "placeholader || '输入点什么吧'"
                v-model = "content"
                @input = "input"
                @compositionstart = "compositionStart"
                @compositionend = "compositionEnd"
                @keydown.13 = "clickSubmit">
            <a href = "javascript:void(0)" @click = "clickSubmit">
                <svg>
                    <use xlink:href = "#icon-search"></use>
                </svg>
            </a>
        </div>
        <ul class = "search-relative" v-if = "content" :class="{ active: true }">
        	<li v-if = "content && dropdown && dropdown.length === 0">{{ `不存在为 ${ content } 的项` }}</li>
            <li
                v-for = "(item, index) in dropdown"
                :key = "index"
                class = "active"
                @click = "clickItem(item)"
                >{{ item.name }}</li>
        </ul>
    </div>
</template>
<script>
    import '../assets/home.js';
    export default {
        data () {
            return { content: '', lockInput: false, };
        },
        props: ['dropdown', 'handleInput', 'handleClickSubmit'],
        methods: {
            input () {
                const { content } = this;
                if (this.lockInput) return;
                if (!content.toString().trim().length) return;
                if (this.handleInput) return this.handleInput(content);
            },
            clickItem (item) {
                if (this.handleClickItem) return this.handleClickItem(item);
            },
            clickSubmit () {
                const { content } = this;
                if (this.lockInput) return;
                if (!content.toString().trim().length) return console.log('请输入文字');
                if (this.handleSubmit) return this.handleSubmit(content);
            },
            timeout(callback, time) {
                setTimeout(callback, time);
            },
            compositionStart () { this.lockInput = true; },
            compositionEnd() { this.lockInput = false; }
        },
    };
</script>
<style lang = "scss">
    .search-container {
        width: 70%;
        display: block;
        margin: 0 auto;
        font-size: 10px;
        max-width: 800px;
        min-width: 200px;
        position: relative;
        box-sizing: border-box;

        .search-item {
            font-size: 2em;
            height: 40px;
            display: flex;
            line-height: 40px;

            input { outline: none; height: 100%; box-sizing: border-box; border: none; padding: 0; font-size: inherit; line-height: inherit; flex: 1 1 0; padding: 5px 20px; }
            a { text-decoration: none; height: 100%;  box-sizing: border-box; line-height: inherit; flex: 0 0 40px; background: #19B955; }
            a svg { width: 100%; height: 100%; box-sizing: border-box; padding: 5px; }
            a:hover { color: #ffffff; background: #00ffff; }
        }
        .search-relative {
            width: 100%;
            min-width: 100%;
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
                cursor: pointer;
                font-size: 1.6em;
                padding: 5px 20px;
                padding-left: 40px;
                transition: all .6s ease-in-out;
                &:not(:first-child) { border-top: 1px solid #aeaeae; }
                &:hover { color: #0a0a0a; background: #aeaeae; }
                &.active { padding-left: 20px; }
            }
            &.active {  margin-top: 20px; opacity: 1; }
        }
    }
</style>
