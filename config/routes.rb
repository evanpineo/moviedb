Rails.application.routes.draw do

  root 'movies#main'
  get '/movies/search', to: 'movies#search'
  get '/movies/:id', to: 'movies#show'
  # resources :movies, only: ['show']
end
