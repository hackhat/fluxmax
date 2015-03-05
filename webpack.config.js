var path = require('path');





module.exports = {
    entry: './src/index',
    output: {
        libraryTarget : "var",
        library       : "Fluxmax",
        path          : path.join(__dirname, './dist'),
    }
}
