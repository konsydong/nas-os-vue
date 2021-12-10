const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
// 自动导入
// First you need install unplugin-vue-components and unplugin-auto-import.
// npm install -D unplugin-vue-components unplugin-auto-import
module.exports = {
    // ...
    plugins: [
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
}