var gulp        = require('gulp');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var uglify      = require('gulp-uglifyjs');

var config = {
  bowerDir: './bower_components',
  publicDir: './public',
  html: './public/**/*html',
  css: 'css/app.scss',
};




// サーバーを立ち上げる
var browser     = require("browser-sync");

gulp.task("server", function() {
    browser({
        server: {
            baseDir: config.publicDir
        }
    });
});



gulp.task('fonts', function() {
  return gulp.src([
    config.bowerDir + '/bootstrap-sass/assets/fonts/**/*',
  ])
  .pipe(gulp.dest(config.publicDir + '/fonts'));
});

gulp.task('js', function() {
  return gulp.src([
    config.bowerDir + '/jquery/dist/jquery.min.js',
    config.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.js',
  ])
  .pipe(uglify('app.js', {
    compress: false,
    outSourceMap: true,
  }))
  .pipe(gulp.dest(config.publicDir + '/js'))
  .pipe(browser.reload({stream:true}));
});

gulp.task('css', function() {
  return gulp.src(config.css)
  .pipe(sourcemaps.init())
  .pipe(sass({
    style: 'compressed',
    includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(config.publicDir + '/css'))
  .pipe(browser.reload({stream:true}));
});




// HTML保存タスク
gulp.task("html", function() {
    gulp.src(config.publicDir)
        .pipe(browser.reload({stream:true}));
});

gulp.task('watch' , function(){
    gulp.watch( config.css,["css"]);
    gulp.watch( [
    config.bowerDir + '/jquery/dist/jquery.min.js',
    config.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.js',
  ],["js"]);
    gulp.watch( config.html,["html"]);
});




gulp.task('default', ['css', 'js', 'fonts', 'server', 'watch']);
