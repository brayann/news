var gulp = require('gulp');
var changed = require('gulp-changed');
var $ = require('gulp-load-plugins')();

var vendor_css = [
    'bower_components/bootstrap/dist/css/bootstrap.css',
    'bower_components/font-awesome/css/font-awesome.css'
];

var vendor_js = [
    'bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js'
];

var fonts = [
    'bower_components/font-awesome/fonts/*'
];

function errorLog(err) {
    $.util.beep();
    $.util.log($.util.colors.red('Error:'), $.util.colors.yellow(err.extract));
    $.util.log($.util.colors.bgYellow($.util.colors.blue(err.message)));
    $.util.log($.util.colors.red('Line number: '), $.util.colors.yellow(err.lineNumber));
    this.emit('end');
}

gulp.task('style_libs', function(){
    return gulp.src(vendor_css)
        .pipe($.concat('libs.css'))
        .pipe($.minifyCss())
        .pipe(gulp.dest('public/css'))
});

gulp.task('js_libs', function(){
    return gulp.src(vendor_js)
        .pipe($.concat('libs.js'))
        // .pipe($.uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task('styles', function() {
    return gulp.src(['app_frontend/css/*.css'])
        .on('error', errorLog)
        .pipe($.concat('main.css'))
        .pipe($.minifyCss())
        .pipe(gulp.dest('public/css'));
});

gulp.task('javascript', function(){
    return gulp.src(['app_frontend/javascript/**/*.js'])
        .pipe($.concat('main.js'))
        .on('error', errorLog)
        .pipe(gulp.dest('public/js'));
});

gulp.task('fonts', function(){
    return gulp.src(fonts)
        .pipe(gulp.dest('public/fonts'));
});

gulp.task('watch', ['default'], function() {
    $.livereload.listen();
    gulp.watch('app_frontend/css/*.css', ['styles']).on('change', $.livereload.changed);
    gulp.watch('app_frontend/javascript/**/*.js', ['javascript']).on('change', $.livereload.changed);
});

gulp.task('default', [], function() {
    gulp.start('style_libs', 'js_libs', 'styles', 'javascript', 'fonts');
});
