const path = require("path");

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '...']
    },
    entry: "./src/index.js",
    output: {
        path: path.resolve("public"),
        filename: "bundle.js"
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
        ]
    }
}