var gulp 					= require('gulp'),

	sourcemaps 				= require('gulp-sourcemaps'),
	rename 					= require("gulp-rename"),

	sass 					= require('gulp-sass'),

	postcss					= require('gulp-postcss'),
	autoprefixer_postcss	= require('autoprefixer'),
	cssnano_postcss			= require('cssnano'),

	pug 					= require('gulp-pug'),

	uglify 					= require('gulp-uglify');



gulp.task('css', function() {

	css('desktop/code/app/sass/**/all.*', 'desktop/code/dist/css/');
});




gulp.task('html', function() {

	html([
		'desktop/code/app/pug/**/*', 'desktop/code/');
});




gulp.task('js', function() {

	js('desktop/code/app/js/**/*.js', 'desktop/code/dist/js/');
});



gulp.task('watch', function() {

	gulp.watch('desktop/code/app/sass/**/*', ['css']);
	gulp.watch('desktop/code/app/pug/**/*', ['html']);
	gulp.watch('desktop/code/app/js/**/*.js', ['js']);
});

gulp.task('default', ['watch']);





function css(from, to) {

	gulp.src(from)

		.pipe (
			sourcemaps.init()
		)

		.pipe (
			sass().on('error', sass.logError)
		)

		.pipe(
			postcss([
				autoprefixer_postcss({
					browsers: ['> 1%', 'IE 9'],
					remove: false,
					cascade: false
				}),

				cssnano_postcss({
					zindex: false
				})

			])
		)

		.pipe (
			rename({
				suffix: '.min'
			})
		)

		.pipe (
			sourcemaps.write('./')
		)

		.pipe(
			gulp.dest(to)
		);
}

function html(from, to) {

	gulp.src(from)

		.pipe (
			pug({
				pretty: true
			}).on('error', function (error) {
				console.error('' + error);
			})
		)

		.pipe(
			gulp.dest(to)
		);
}

function js(from, to) {

	gulp.src(from)

		.pipe (
			uglify()
		)

		.pipe(
			gulp.dest(to)
		);
}