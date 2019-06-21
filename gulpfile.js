var gulp 					= require('gulp'),

	sourcemaps 				= require('gulp-sourcemaps'),
	rename 					= require("gulp-rename"),

	sass 					= require('gulp-sass'),

	postcss					= require('gulp-postcss'),
	autoprefixer_postcss	= require('autoprefixer'),
	cssnano_postcss			= require('cssnano'),

	pug 					= require('gulp-pug'),

	babel					= require('gulp-babel'),
	uglify 					= require('gulp-uglify');



gulp.task('css', function() {

	css('code/app/sass/**/all.*', 'code/dist/css/');
});




gulp.task('html', function() {

	html([
		'code/app/pug/**/*.pug',

		'!code/app/pug/extends/**/*',
		'!code/app/pug/includes/**/*',
		'!code/app/pug/mixins/**/*',
		], 'code/' );
});




gulp.task('js', function() {

	js('code/app/js/**/*.js', 'code/dist/js/');
});




gulp.task('watch', function() {

	gulp.watch('code/app/sass/**/*', ['css']);
	gulp.watch('code/app/pug/**/*', ['html']);
	gulp.watch('code/app/js/**/*.js', ['js']);
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

		.pipe(
			babel({
				presets: ['env']
			})
		)

		.pipe (
			uglify()
		)

		.pipe(
			gulp.dest(to)
		);
}