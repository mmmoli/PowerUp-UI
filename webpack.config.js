var getConfig = require('hjs-webpack');


module.exports = getConfig({
    // entry point for the app
    in: 'src/main.js',

    // Name or full path of output directory
    // commonly named `www` or `public`. This
    // is where your fully static site should
    // end up for simple deployment.
    out: 'dist',

    // This will destroy and re-create your
    // `out` folder before building so you always
    // get a fresh folder. Usually you want this
    // but since it's destructive we make it
    // false by default
    clearBeforeBuild: true,

    html: function (data) {
        // here we return an object where each key is a file to be generated
        return {
            'index.html': [
                '<html>',
                '<head>',
                '<link href="' + data.css + '" rel="stylesheet" type="text/css" />',
                '<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/3.1.2/rx.all.min.js"></script>',
                '</head>',
                '<body>',
                '<span id="powerBar"></span>',
                '<script src="' + data.main + '"></script>',
                '</body>',
                '</html>'
            ].join('')
        }
    }
});