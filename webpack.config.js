// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//    entry: './src/index.js',
//    output: {
//       path: path.join(__dirname, '/bundle'),
//       filename: 'index_bundle.js'
//    },
//    devServer: {
//       inline: true,
//       port: 9002
//    },
//    module: {
//       rules: [
//          {
//             test: /\.jsx?$/,
//             exclude: /node_modules/,
//             loader: 'babel-loader',
//             query: {
//                presets: ["@babel/preset-env", "@babel/preset-react"]
//             }
//          },

//          {
//             test: /\.css$/,
//             exclude: /node_modules/,
//             loaders: ['style-loader', 'css-loader'],
//          }
//       ]
//    },
//    resolve: {
//       extensions: ['*', '.js', '.jsx']
//    },
//    plugins: [
//       new HtmlWebpackPlugin({
//          template: './src/index.html'
//       })
//    ]
// }


const webpack = require('webpack');
module.exports = {
   entry: './src/index.js',
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
         },
         {
            test: /\.css$/,
            exclude: /node_modules/,
            loaders: ['style-loader', 'css-loader'],
         },
         {
            test: /\.(svg)$/,
            exclude: /fonts/, /* dont want svg fonts from fonts folder to be included */
            use: [
               {
                  loader: 'svg-inline-loader',
                  options: {
                     noquotes: true,
                  },
               },
            ],
         },
         {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
               'file-loader',
               {
                  loader: 'image-webpack-loader',
                  options: {
                     bypassOnDebug: true, // webpack@1.x
                     disable: true, // webpack@2.x and newer
                  },
               },
            ],
         }
      ]
   },
   resolve: {
      extensions: ['*', '.js', '.jsx']
   },
   output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'bundle.js'
   },
   plugins: [
      new webpack.HotModuleReplacementPlugin()
   ],
   devServer: {
      contentBase: './dist'
   }
};