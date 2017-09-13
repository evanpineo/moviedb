Rails.application.routes.draw do

  root 'movies#main'
  resources :movies
end
