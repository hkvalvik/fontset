var gulp = require('gulp');

gulp.task('connect', require('./gulp-tasks/connect')(gulp));
gulp.task('css', require('./gulp-tasks/css')(gulp));
gulp.task('demo-css', require('./gulp-tasks/demo-css')(gulp));
gulp.task('html', require('./gulp-tasks/html')(gulp));
gulp.task('screenshots', require('./gulp-tasks/screenshots')(gulp));

gulp.task('watch', function(){
    gulp.watch(
        ['*.scss', 'components/**/*.scss', 'fonts/**/*.scss', 'mixins/**/*.scss', '!node_modules'],
        ['css']
    );
    gulp.watch(['demo/**/*.scss'], ['demo-css']);
    gulp.watch(['demo/**/*.hbs', 'components/**/*.hbs', '!node_modules'], ['html']);
});

gulp.task('default', ['connect', 'css', 'demo-css', 'html', 'watch']);
