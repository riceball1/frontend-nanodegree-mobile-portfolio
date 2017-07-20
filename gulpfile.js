var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var stripedebug = require('gulp-strip-debug');
var deporder = require('gulp-deporder');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');

// development mode?
devBuild = (process.env.NODE_ENV !== 'production');

// folders
folder = {
    main: './',
    src: 'src/',
    build: 'dist/'
};


/** VIEWS FOLDER MINIFICATION **/

// html minification
gulp.task('viewsminify', function() {
    return gulp.src('src/views/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(folder.build + 'views'));
});

// minify css
// minify and rename css with suffix min
gulp.task('viewscss', function() {
    return gulp.src(folder.src + 'views/css/*.css') // src files
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' })) // gulp plugin
        .pipe(gulp.dest(folder.build + 'views/css/')) // output
});

// js files minified
gulp.task('viewsjs', function() {
    var jsbuild = gulp.src(folder.src + 'views/js/*')
        .pipe(deporder());

    if (!devBuild) {
        jsbuild = jsbuild
            .pipe(stripedebug())
            .pipe(uglify());
    }
    return jsbuild.pipe(gulp.dest(folder.build + 'views/js/'));
});

// minify view images
gulp.task('viewsimageminify', function() {
            gulp.src(folder.src + 'views/images/*')
                .pipe(imagemin({
                        verbose: true
                    }))
                    .pipe(gulp.dest(folder.build + 'views/images/'))
                });

        /*** REGULAR FILES ***/

        // Other HTML files minified:
        gulp.task('minify', function() {
            return gulp.src(folder.src + '*.html')
                .pipe(htmlmin({ collapseWhitespace: true }))
                .pipe(gulp.dest('./'));
        });

        gulp.task('js', function() {
            var jsbuild = gulp.src(folder.src + 'js/')
                .pipe(deporder());

            if (!devBuild) {
                jsbuild = jsbuild
                    .pipe(stripedebug())
                    .pipe(uglify());
            }
            return jsbuild.pipe(gulp.dest(folder.build + 'js/'));
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
                .pipe(imagemin({
                    verbose: true
                }))
                .pipe(gulp.dest(folder.build + 'img/'))
        });


        /** RUN AND WATCH TASKS ***/

        // run all tasks
        gulp.task('run', ['css', 'js', 'minify', 'viewsminify', 'viewsjs', 'viewsimageminify', 'imageminify', 'viewscss']);

        // watch for changes
        gulp.task('watch', function() {

            // views changes:
            gulp.watch(folder.src + 'views/**/*', ['viewsminify', 'viewsjs', 'viewsimageminify', 'viewscss']);


            // regular changes:
            gulp.watch(folder.src + '*.html', ['minify']);
            gulp.watch(folder.src + 'js/**/*', ['js']);
            gulp.watch(folder.src + 'css/**/*', ['css']);
            gulp.watch(folder.src + 'img/**/*', ['imageminify']);

        });


        // default task
        gulp.task('default', ['run', 'watch']);
