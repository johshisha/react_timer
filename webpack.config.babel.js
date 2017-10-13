import path from 'path';
import webpack from 'webpack';

export default {
  context: path.join(__dirname, '/src'),
  entry: [
    // 'react-hot-loader/patch',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    './client/app.jsx',
  ],
  output: {
    filename: 'client-bundle.js',
    publicPath: '/',
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader?modules'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
