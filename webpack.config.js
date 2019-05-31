


// // entry: "./frontend/js/map.js"

// module.exports = {
//   context: __dirname,
//   entry: "./app.js",
//   output: {
//     path: path.resolve(__dirname, 'frontend'),
//     filename: "bundle.js"
//   },
//   optimization: {
//     minimizer: [
//       // we specify a custom UglifyJsPlugin here to get source maps in production
//       new UglifyJsPlugin({
//         cache: true,
//         parallel: true,
//         uglifyOptions: {
//           compress: {
//             warnings: true
//           },
//           ecma: 6,
//           mangle: true
//         },
//         sourceMap: true
//       })
//     ]
//   },
//   plugins: plugins,
//   devtool: 'source-map',
//   resolve: {
//     extensions: [".js", ".jsx", "*"]
//   }
// };


// copied over....
// 

var path = require("path");
var webpack = require("webpack");

var plugins = [];
var devPlugins = [];

var prodPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })
];

plugins = plugins.concat(
  process.env.NODE_ENV === 'production' ? prodPlugins : devPlugins
);


module.exports = {
  context: __dirname,
  entry: "./frontend/js/map.js",
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
  plugins: plugins,
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};
