Rails.application.routes.draw do
  resources :movies do
      get 'search'
  end

  root 'movies#index'
end
