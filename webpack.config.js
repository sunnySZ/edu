var path = require('path')
var webpack = require('webpack')
var fs = require('fs')
//var HtmlWebpackPlugin = require('html-webpack-plugin')

const production = (process.env.NODE_ENV === 'production')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
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
        noInfo: true,
        proxy: {
            //将请求地址里的'/yjt'通过本地开发服务器webpack-dev-server转发到'http://121.40.154.136/'
            '/yjt': {
                target: 'http://121.40.154.136', //http://121.40.154.136
                pathRewrite: {'^/yjt': '/yjt'}, //将 '^/yjt' 替换成http://121.40.154.136/yjt
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true
            }
        }
    },
    performance: {
        hints: false
    },
 //   devtool: '#eval-source-map'
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
        })
/*        new HtmlWebpackPlugin({
            filename: './index.html',//在dist目录下会生成index.html，并注入脚本
            inject: true //此参数必须加上，不加不注入
        })*/
    ])
} else {
    module.exports.devtool = '#source-map'
}
