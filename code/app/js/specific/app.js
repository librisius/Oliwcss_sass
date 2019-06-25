$(document).ready(function() {

	(function() {

		if ( $( '.c-slick-examples' ).length ) {

			$( '.c-slick-examples' ).slick({
				centerMode: true,
				speed: 300,
				variableWidth: true,
				slidesToShow: 4,
				focusOnSelect: true,
			});
		}
	})();
});