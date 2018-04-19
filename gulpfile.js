var gulp 					= require('gulp'),

	sourcemaps 				= require('gulp-sourcemaps'),
	rename 					= require("gulp-rename"),

	sass 					= require('gulp-sass'),

	postcss					= require('gulp-postcss'),
	autoprefixer_postcss	= require('autoprefixer'),
	cssnano_postcss			= require('cssnano'),

	jade 					= require('gulp-jade'),

	babel					= require('gulp-babel'),
	uglify 					= require('gulp-uglify');



gulp.task('css', function() {

	css('desktop/code/app/sass/**/all.*', 'desktop/code/dist/css/');
	css([
		'desktop/code/extension/application/app/sass/**/*.sass',
		'!desktop/code/extension/application/app/sass/**/_*.sass',
	], 'desktop/code/extension/application/dist/css/');
	css('desktop/code/extension/others/app/sass/**/style.*', 'desktop/code/extension/others/dist/css/');
});




gulp.task('html', function() {

	html([
		'desktop/code/app/jade/**/*.jade',

		'!desktop/code/app/jade/extends/**/*',
		'!desktop/code/app/jade/includes/**/*',
		'!desktop/code/app/jade/mixins/**/*',
		], 'desktop/code/' );

	html([
		'desktop/code/extension/application/app/jade/**/*.jade',

		'!desktop/code/extension/application/app/jade/extends/**/*',
		'!desktop/code/extension/application/app/jade/includes/**/*',
		'!desktop/code/extension/application/app/jade/mixins/**/*',
	], 'desktop/code/extension/application/' );

	html([
		'desktop/code/extension/others/app/jade/**/*.jade',

		'!desktop/code/extension/others/app/jade/extends/**/*',
		'!desktop/code/extension/others/app/jade/includes/**/*',
		'!desktop/code/extension/others/app/jade/mixins/**/*',
	], 'desktop/code/extension/others/' );
});




gulp.task('js', function() {

	js('desktop/code/app/js/**/*.js', 'desktop/code/dist/js/');
	js('desktop/code/extension/application/app/js/**/*.js', 'desktop/code/extension/application/dist/js/');
	js('desktop/code/extension/others/app/js/**/*.js', 'desktop/code/extension/others/dist/js/');
});




gulp.task('watch', function() {

	gulp.watch('desktop/code/app/sass/**/*', ['css']);
	gulp.watch('desktop/code/extension/application/app/sass/**/*', ['css']);
	gulp.watch('desktop/code/extension/others/app/sass/**/*', ['css']);

	gulp.watch('desktop/code/app/jade/**/*', ['html']);
	gulp.watch('desktop/code/extension/application/app/jade/**/*', ['html']);
	gulp.watch('desktop/code/extension/others/app/jade/**/*', ['html']);

	gulp.watch('desktop/code/app/js/**/*.js', ['js']);
	gulp.watch('desktop/code/extension/application/app/js/**/*.js', ['js']);
	gulp.watch('desktop/code/extension/others/app/js/**/*.js', ['js']);
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
			jade({
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