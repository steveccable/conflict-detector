var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
/* these two allow injecting of the <script> tag into the index.html file when building */
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'src/index.html'),
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: [
    './src/index.js'
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: "babel-loader"
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      /* the following is for css modules */
      {
        test: /\.css/,
        include: path.join(__dirname, 'src'),
        loader: ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    inline: true
  },
  plugins: [
    new ExtractTextPlugin("styles.css"), // for css modules
    HTMLWebpackPluginConfig,
    /* These needed for production build: http://dev.topheman.com/make-your-react-production-minified-version-with-webpack/ */
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }
    })
  ]
}
