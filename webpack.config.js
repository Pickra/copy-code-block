const path = require("path");

module.exports = {
    entry: {
        "copyCodeBlock": "./src/copyCodeBlock.js"
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].js"
    },
    mode: "production"
};