var gulp = require('gulp');
var webpack = require('webpack-stream');
var sass = require('gulp-sass');

gulp.task('webpack', function() {
  return gulp.src('./scripts.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js',
      }
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', [], function() {
    return gulp.src('./style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/'))
});


gulp.task('watch', function() {
    gulp.watch(['./*.js', './*.scss'], ['webpack', 'sass']);
});

gulp.task('default', ['webpack', 'sass', 'watch']);

