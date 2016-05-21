var sass = require('gulp-sass');

module.exports = function(gulp){
    return function(){
        return gulp.src('demo/index.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('demo'));
    };
};