var path = require('path')
var webpack = require('webpack')
var fs=require('fs')
var HtmlWebpackPlugin=require('html-webpack-plugin')
var production=(process.env.NODE_ENV === 'production')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/edu/dist/',
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        test: /\.less$/,
                        loader: "style-loader!css-loader!less-loader",
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}
var deleteFolder = function (paths, isrmDir) {
    if (fs.existsSync(paths)) {
        var dirList = fs.readdirSync(paths);
        dirList.forEach(function (fileName) {
            var currPath = paths + '/' + fileName;
            if (fs.statSync(currPath).isDirectory()) {
                deleteFolder(currPath, true)
            } else {
                fs.unlinkSync(currPath)
            }
        })
        if (isrmDir) {
            fs.rmdirSync(paths)
        }
        fs.rmdirSync(paths)
    }
}
if (process.env.NODE_ENV === 'production') {
    deleteFolder('./dist')
    // module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new HtmlWebpackPlugin({
            filename:'./index.html',//在dist目录下会生成index.html，并注入脚本
            inject:true //此参数必须加上，不加不注入
        })
    ])
}else{
    module.exports.devtool = '#source-map'
}
