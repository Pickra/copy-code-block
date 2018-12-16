const path = require("path");

module.exports = {
    entry: {
        "copyCodeBlock": "./src/copyCodeBlock.js"
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].js",
        libraryExport: 'default',
        libraryTarget: 'umd'
    },
    mode: "production",
    externals: [/^highlight\.js/],
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-object-rest-spread']
              }
            }
          }
        ]
    }
};