const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    content_scripts: "./src/content_scripts/index.tsx",
    browser_action:  "./src/browser_action/index.tsx",
    background:      "./src/background/index.tsx"
  },
  output:
    {
      filename: "js/[name].bundle.js",
      path: path.resolve(__dirname, "bundle")
    }
  ,
  module: {
    rules: [
      {
        test:  /\.js$/,
        loader: "shebang-loader",
        exclude: ["/node_mocules/"]
      },
      {
        test: /\.tsx?$/,
        exclude: ["/node_mocules/", "/src/assets/scss/"],
        use: [
          "ts-loader"
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "sass-loader",
        ]
      }
    ]
  },
  resolve: {
    modules: [
      "./node_modules",
      "./src",
      "./src/assets/js"
    ],
    extensions: [".ts", ".tsx", ".js", "jsx"]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    })
  ],
  optimization: {
    splitChunks: {
      name: "common",
      chunks: "initial",
    }
  }
};

