const path = require('path');

module.exports = {
    entry : './ts/main.ts',
    output : {
        path : path.resolve(__dirname, 'js'),
        filename : 'index.js'
    },
    module : {
        rules : [
            {
                test : /\.ts$/,
                use : 'ts-loader',
                exclude : /node_modules/
            }
        ]
    },
    resolve : {
        extensions : ['.ts', '.js']
    }
};