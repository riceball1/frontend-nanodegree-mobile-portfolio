var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var stripedebug = require('gulp-strip-debug');
var cache = require('gulp-cache');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');

// folders
folder = {
    main: './',
    src: 'src/',
    build: 'dist/'
};

/*** REGULAR FILES ***/

// Other HTML files minified:
gulp.task('minify', function() {
    return gulp.src(folder.src + '*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./'));
});

gulp.task('js', function() {
    return gulp.src(folder.src + 'js/')
            .pipe(stripedebug())
            .pipe(uglify())
            .pipe(gulp.dest(folder.build + 'js/'));
});

// minify and rename css with suffix min
gulp.task('css', function() {
    return gulp.src('./css/*.css') // src files
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' })) // gulp plugin
        .pipe(gulp.dest(folder.build + 'css/')) // output
});

// minify images
gulp.task('imageminify', function() {
    gulp.src(folder.src + 'img/*')
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true, verbose: true }))
        .pipe(gulp.dest(folder.build + 'img/'))
});

// minify views images
gulp.task('imageminify2', function() {
    gulp.src('views/images/*')
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true, verbose: true }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('views/images/'))
});


/** RUN AND WATCH TASKS ***/

// run all tasks
gulp.task('run', ['css', 'js', 'minify', 'imageminify', 'imageminify2']);

// watch for changes
gulp.task('watch', function() {

    // views changes:
    gulp.watch(folder.src + 'views/**/*', ['imageminify2']);

    // regular changes:
    gulp.watch(folder.src + '*.html', ['minify']);
    gulp.watch(folder.src + 'js/**/*', ['js']);
    gulp.watch(folder.src + 'css/**/*', ['css']);
    gulp.watch(folder.src + 'img/**/*', ['imageminify']);

});


// default task
gulp.task('default', ['run', 'watch']);




// /** VIEWS FOLDER MINIFICATION **/

// // html minification
// gulp.task('viewsminify', function() {
//     return gulp.src('src/views/*.html')
//         .pipe(htmlmin({ collapseWhitespace: true }))
//         .pipe(gulp.dest(folder.build + 'views'));
// });

// // minify css
// // minify and rename css with suffix min
// gulp.task('viewscss', function() {
//     return gulp.src(folder.src + 'views/css/*.css') // src files
//         .pipe(cssmin())
//         .pipe(rename({ suffix: '.min' })) // gulp plugin
//         .pipe(gulp.dest(folder.build + 'views/css/')) // output
// });

// // js files minified
// gulp.task('viewsjs', function() {
//     var jsbuild = gulp.src(folder.src + 'views/js/*')
//         .pipe(deporder());

//     if (!devBuild) {
//         jsbuild = jsbuild
//             .pipe(stripedebug())
//             .pipe(uglify());
//     }
//     return jsbuild.pipe(gulp.dest(folder.build + 'views/js/'));
// });

// // minify view images
// gulp.task('viewsimageminify', function() {
//             gulp.src(folder.src + 'views/images/*')
//                 .pipe(imagemin({
//                         verbose: true
//                     }))
//                     .pipe(gulp.dest(folder.build + 'views/images/'))
//                 });
