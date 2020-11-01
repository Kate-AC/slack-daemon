const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/main.tsx',
    background: './src/background.tsx',
    popup: './src/popup.tsx'
  },
  devtool: 'inline-source-map',
  output:
    {
      filename: 'js/[name].bundle.js',
      path: path.resolve(__dirname, 'bundle')
    }
  ,
  module: {
    rules: [
      {
        test:  /\.js$/,
        loader: 'shebang-loader',
        exclude: ["/node_mocules/", "/node_modules/public-encrypt/test/test_rsa_pubkey.pem"]
      },
      {
        test: /\.tsx?$/,
        exclude: ["/node_mocules/", "/src/assets/scss/"],
        use: [
          'ts-loader'
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ]
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
    })
  ],
  optimization: {
    splitChunks: {
      name: 'common',
      chunks: 'initial',
    }
  }
};

