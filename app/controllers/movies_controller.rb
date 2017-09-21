class MoviesController < ApplicationController
  def show
    api_key = ENV["TMDB_API_KEY"]
    movie_id_url = "https://api.themoviedb.org/3/movie/#{id}?api_key=#{api_key}"
    resp = HTTParty.get(movie_id_url)
    render json: resp.body
  end
  
  def search
    search_string = params[:query]
    api_key = ENV["TMDB_API_KEY"]
    search_movie_url = "https://api.themoviedb.org/3/search/movie?api_key=#{api_key}&query=#{search_string}"
    resp = HTTParty.get(search_movie_url)
    render json: resp.body
  end
end
