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

	(function() {

		if ( $( '.c-manipulate-class-timing' ).length ) {

			$( '.c-manipulate-class-timing' ).each( function( index, el ) {

				var $this			= $( this ),
					className		= $this.data( 'c-manipulate-class-timing-class' ) ? $this.data( 'c-manipulate-class-timing-class' ): undefined,
					duration		= $this.data( 'c-manipulate-class-timing-duration' ) ? $this.data( 'c-manipulate-class-timing-duration' ): 1000,
					operationType	= $this.data( 'c-manipulate-class-timing-operation-type' ) ? $this.data( 'c-manipulate-class-timing-operation-type' ): undefined;

				setTimeout(function() {
					if ( className ? className : false ) {
						if ( operationType ? operationType == 'remove' : false ) {
							$( el ).removeClass( className );
						} else {
							$( el ).addClass( className );
						}
					}
				}, duration);
			});
		}
	})();

	(function() {

		if ( $( '.c-manipulate-class' ).length ) {

			$( '.c-manipulate-class' ).each( function( index, el ) {

				$( this ).on( 'click', function( event ) {
					var $this			= $( this ),
						$element		= ( $this.data( 'c-manipulate-class-element' ) || $this ) ? ( $this.data( 'c-manipulate-class-element' ).split(', ') || $this ) : undefined,
						className		= $this.data( 'c-manipulate-class-class' ) ? $this.data( 'c-manipulate-class-class' ).split(', ') : undefined,
						operationType	= $this.data( 'c-manipulate-class-operation-type' ) ? $this.data( 'c-manipulate-class-operation-type' ).split(', ') : undefined,
						$closest		= $this.data( 'c-manipulate-class-closest' ) ? $this.data( 'c-manipulate-class-closest' ).split(', ') : undefined;

					$element.forEach( function( el, i ) {
						if ( className ? className[ i ] : false ) {
							if ( $closest ? $closest[ i ] : false ) {
								if ( operationType ? operationType[ i ] == 'remove' : false ) {
									$( $element[ i ] ).closest( $closest[ i ] ).removeClass( className[ i ] );
								} else {
									$( $element[ i ] ).closest( $closest[ i ] ).addClass( className[ i ] );
								}
							} else {
								if ( operationType ? operationType[ i ] == 'remove' : false ) {
									$( el ).removeClass( className[ i ] );
								} else {
									$( el ).addClass( className[ i ] );
								}
							}
						}
					});
				});
			});
		}
	})();
});