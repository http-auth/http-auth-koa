require('babel-core/register')({
    presets: ["es2015"],
    plugins: [
        "transform-async-to-generator",
        "syntax-async-functions"
    ]
});

require("babel-polyfill");
require('./app');