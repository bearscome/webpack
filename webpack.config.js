const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'src', 'index.js')
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename:'index.js'
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            inject: true,
            minify: true,
            meta: {
                'theme-color': '#4285f4',
                'description': 'meta: Webpack',
            },
            templateParameters: {
                title: 'Webpack', 
                lang: 'ko-KR',   
            },
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use:["style-loader","css-loader"]
            }
        ]
    }
}