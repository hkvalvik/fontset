var fs = require('fs');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var hljs = require('highlight.js');

module.exports = function(gulp){
    return function(){
        const CSS_DIR = 'fonts';
        var settingsContent = hljs.highlight('scss', fs.readFileSync('_settings.scss', 'utf-8')).value;
        settingsContent = settingsContent.replace(/\/\*/g, '<span class="demo-hljs-heading">').replace(/\*\//g, '</span>');
        const FONT_NAMES = fs.readdirSync(CSS_DIR)
            .filter(f => f.split('.').pop() == 'css')
            .map(f => f.split('.').shift());
        const SELECTED_FONT = FONT_NAMES.filter(name => {
            return name == 'roboto-slab_roboto';
        }).pop();
        const SELECTED_BUTTON_CLASS = 'demo-font-list-selected';
        const FONTS = FONT_NAMES.map(name => {
            return {
                name: name,
                selected: name == SELECTED_FONT,
                buttonClass: name == SELECTED_FONT ? SELECTED_BUTTON_CLASS : ''
            }
        });

        return gulp.src([
                'demo/index.hbs',
                'demo/documentation.hbs',
                'demo/demo.hbs'
            ])
            .pipe(
                handlebars({
                        fonts: FONTS,
                        selectedFont: SELECTED_FONT,
                        selectedButtonClass: SELECTED_BUTTON_CLASS,
                        fontsPath: 'fonts',
                        screenshotsPath: 'demo/dist/screenshots',
                        exampleIncludePath: 'node_modules/fontset',
                        settingsContent: settingsContent
                    },
                    {
                        batch : ['./components', './demo', './demo/partials']
                    })
            )
            .pipe(rename({
                extname: '.html'
            }))
            .pipe(gulp.dest('.'));
    };
};