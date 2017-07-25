class MoviesController < ApplicationController
  
  def index
    @movies = movie_service.now_playing
  end
  
  def movie
    @movie = @tmdb.detail(params['id'])
  end
  
  def show
    @movie = @tmdb.detail(params[:id])
  end
  
  def search
    @movies = movie_service.find(params[:q])
    # @search = Tmdb::Search.new
    # @search.resource('movie')
    # @search.query(params[:q])
    render template: 'movies/index'
  end
  
  private
  
  def image_path
    @image_path ||= movie_service.configuration.base_url
  end
  
  def movie_service
    @movie_service ||= MovieService.new
  end
end
