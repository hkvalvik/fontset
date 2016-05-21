var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babelify = require('babelify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var connect = require('gulp-connect');

module.exports = function(gulp, plugins){
    return function(){
        return browserify({
            entries: 'demo/index.js',
            debug: true,
            transform: [babelify]
        })
        .bundle()
        .on('error', function(err) {
            console.error(err);
            this.emit('end');
        })
        .pipe(source('index.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        //.pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('demo/dist'))
        .pipe(connect.reload());
    };
};