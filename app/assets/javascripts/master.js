$(document).ready(function() {
	
	$('#term').focus(function() {
		var full = $("#poster").has("img").length ? true : false;
		if(full == false) {
			$('#poster').empty();
		}
	});
	
		$('#search').click(getPoster);
		$('#term').keyup(function(event) {
			if(event.keyCode == 13) {
				getPoster();
			}
		});

});

var search_movie_url = "/movies/search";

var getPoster = function() {
	var film = $('#term').val();
	if(film == '') {
		$('#poster').html('<div class="alert"><strong>Oops!</strong> Try adding something into the search field.</div>');
	} else {
		$('#poster').html('<div class="alert"><strong>Loading...</strong></div>');
		var output = '';
		$.getJSON(search_movie_url + "?query=" + film, function(json) {
			if (json != "Nothing found.") {
				console.log(json);
				$.each(json.results, function(i, item) {
					console.log(json.results[i].title);
					var movie = json.results[i];
					if (movie.poster_path !== null) {
						output += `
								<div class="col-md-3 m-3">
			            <div class="well text-center">
		            		<img class="img-responsive" src="https://image.tmdb.org/t/p/w300${movie.poster_path}">
		            		<h5>${movie.title}</h5>
		              	<button onclick="getMovie(${movie.id})" class="btn btn-primary">Movie Details</button>
			            </div>
			          </div>`;
        	}
				});
				$('#poster').html(output);
			} else {
				$.getJSON(search_movie_url + "?query=the+dark+knight", function(json) {
					console.log(json);
					$('#poster').html(`
						<div class="alert">
							<p>We\'re afraid nothing was found for that search.</p>
						</div>
						<p>Perhaps you were looking for The Dark Knight?</p>
						<img id="thePoster" src="https://image.tmdb.org/t/p/w500/' + json[0].poster_path + ' class="img-responsive" />'
					`);
				});
			}
		});
	}
	return false;
};

var movie_id_url = "/movies/";

function getMovie(id) {
	$.getJSON(movie_id_url + id), function(movie) {
		var output = `
			<div class="row">
        <div class="col-md-4">
          <img src="${movie.poster_path}" class="thumbnail">
        </div>
        <div class="col-md-8">
          <h2>${movie.title}</h2>
          <ul class="list-group">
            <li class="list-group-item"><strong>Genre:</strong> ${movie.genres[0].name}</li>
            <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
            <li class="list-group-item"><strong>Rated:</strong> ${movie.rating}</li>
            <li class="list-group-item"><strong>Writer:</strong> ${movie.revenue}</li>
            <li class="list-group-item"><strong>Actors:</strong> ${movie.runtime}</li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="well">
          <h3>Plot</h3>
          ${movie.overview}
          <hr>
          <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
          <a href="index.html" class="btn btn-default">Go Back To Search</a>
        </div>
      </div>
    `;

      $('#movie').html(output);
	};
}