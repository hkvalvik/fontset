var fs = require('fs');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var hljs = require('highlight.js');

module.exports = function(gulp){
    return function(){
        const CSS_DIR = 'fonts';
        var settingsContent = hljs.highlight('scss', fs.readFileSync('_settings.scss', 'utf-8')).value;
        settingsContent = settingsContent.replace(/\/\*/g, '<span class="demo-hljs-heading">').replace(/\*\//g, '</span>');
        const FONTS = fs.readdirSync(CSS_DIR)
            .filter(f => f.split('.').pop() == 'css')
            .map(f => f.split('.').shift());

        return gulp.src('demo/index.hbs')
            .pipe(
                handlebars({
                        fonts: FONTS,
                        selectedFont: FONTS[4],
                        fontsPath: 'fonts',
                        screenshotsPath: 'demo/dist/screenshots',
                        exampleIncludePath: 'node_modules/fontset',
                        settingsContent: settingsContent
                    },
                    {
                        batch : ['./components', './demo']
                    })
            )
            .pipe(rename('index.html'))
            .pipe(gulp.dest('.'));
    };
};