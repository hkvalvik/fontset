var fs = require('fs');
var Pageres = require('pageres');

module.exports = function(gulp){
    return function(){
        const CSS_DIR = 'fonts';
        const FONTS = fs.readdirSync(CSS_DIR)
            .filter(f => f.split('.').pop() == 'css')
            .map(f => f.split('.').shift());
        var pageres = new Pageres({delay: 5});
        FONTS.forEach(font => {
            pageres.src('localhost:10000#font='+font, ['1600x480'], {
                selector: '[data-gulp-screenshot]',
                filename: font,
                css: '[data-gulp-screenshot]{ display: inline-block !important }'
            })
        });

        return pageres
            .dest('demo/dist/screenshots')
            .run()
            .then(() => console.log('done'));
    };
};
