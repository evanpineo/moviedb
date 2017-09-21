Rails.application.routes.draw do

  root 'movies#main'
  get '/movies/search', to: 'movies#search'
  get '/movies/', to: 'movies#show'
end
