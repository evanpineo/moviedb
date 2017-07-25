/* global $ */
$(document).ready(function() {
	
	$('#term').focus(function() {
		var full = $('#poster').has('img').length ? true : false;
		if(full == false) {
			$('#poster').empty();
		}
	});
	
	var getPoster = function() {
		var film = $('#term').val();
		if(film == '') {
			$('#poster').html("<h2 class='loading'>Ha! Please enter something.</h2>");
		} else {
			$('#poster').html("<h2 class='loading'>Your poster is on its way!</h2>");
			$.getJSON("https://api.themoviedb.org/3/search/movie?api_key=" + key + "&query=" + film + "&callback=?", function(json) {
				if (json != "Nothing found.") {
					$('#poster').html('<h2 class="loading">We found you a poster!</h2>' + json.results[0].title + '<img src=\"http://image.tmdb.org/t/p/w500/' + json.results[0].poster_path + '\" class=\"img-responsive\" >');
				} else {
					$.getJSON("https://api.themoviedb.org/3/movie/9340?api_key=" + key + "?callback=?", function(json) {
						console.log(json);
						$('#poster').html("<h2 class='loading'>Nothing was found for that search. Perhaps you were looking for The Goonies?</h2><img id='thePoster' src='http://image.tmdb.org/t/p/w500/'" + json[0].poster_path + ' class="img-responsive" />');
					});
				}
			});
		}
		return false;
		
	};
	$('#search').click(getPoster);
	$('#term').keyup(function(event) {
		if(event.keyCode == 13) {
			getPoster();
		}
	});
	
});
