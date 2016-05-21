var connect = require('gulp-connect');

module.exports = function(gulp){
    return function(){
        connect.server({
            port: 10000,
            root: './',
            livereload: true
        });
    };
};