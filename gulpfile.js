var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');



gulp.task('default', function() {
	return gulp.src('./css/*.css') // src files
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'})) // gulp plugin
		.pipe(gulp.dest('dist/css/')) // output
});