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

	return gulp.src('code/app/sass/**/all.*')

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
			gulp.dest('code/dist/css/')
		);
});




gulp.task('html', function() {

	return gulp.src([
		'code/app/pug/**/*.pug',

		'!code/app/pug/extends/**/*',
		'!code/app/pug/includes/**/*',
		'!code/app/pug/mixins/**/*',
		])

		.pipe (
			pug({
				pretty: true
			}).on('error', function (error) {
				console.error('' + error);
			})
		)

		.pipe(
			gulp.dest('code/')
		);
});




gulp.task('js', function() {

	return gulp.src('code/app/js/**/*.js')

		.pipe(
			babel({
				presets: ['env']
			})
		)

		.pipe (
			uglify()
		)

		.pipe(
			gulp.dest('code/dist/js/')
		);
});




gulp.task('watch', function() {

	gulp.watch('code/app/sass/**/*', gulp.series('css'));
	gulp.watch('code/app/pug/**/*', gulp.series('html'));
	gulp.watch('code/app/js/**/*.js', gulp.series('js'));
});




gulp.task('default', gulp.series('watch'));